'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategories, setSelectedActivities } from '@/store/slice/homePageSearchSlice';
import { RootState } from '@/store/store';
import {
    useGetSpaceTypes,
    useGetAmenities,
    useGetActivities,
    useGetPublicCategories,
    useGetGuestSpaceTags,
} from '@/services';
import { getPlacesData } from '@/services/guest/categories.services';
import {
    setDate,
    setSelectedPlace,
    setPlacesSearchVal,
    setSearchVal,
} from '@/store/slice/homePageSearchSlice';
import { convert12to24 } from '@/lib/utils';
import { FilterSection } from '@/components/common/FilterDrawer';

export const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface FilterState {
    spaceTypeIds: number[];
    activityIds: number[];
    amenityIds: number[];
    instantBooking: boolean;
    attendees?: number;
    minPrice?: number;
    maxPrice?: number;
    date?: Date;
    startTime?: string;
    endTime?: string;
    cityId?: number | string;
    categoryIds?: number[];
    range?: string;
}

const LIMIT = 10;

export const useSpaceList = (initialSpaceData?: any) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [initializedFromUrl, setInitializedFromUrl] = useState(false);

    const {
        selectedCategories,
        selectedActivities,
        selectedPlace,
        date: selectedDateFromStore,
    } = useSelector((state: RootState) => state.homeSearchData);
    const { isAuth } = useSelector((state: RootState) => state.auth);

    const [appliedFilters, setAppliedFilters] = useState<FilterState>({
        spaceTypeIds: [],
        activityIds: selectedActivities.flatMap((a) => a.ids) || [],
        amenityIds: [],
        instantBooking: false,
        categoryIds: selectedCategories.map((c) => Number(c.item.id)) || [],
        cityId: selectedPlace?.id,
        date: selectedDateFromStore ? new Date(selectedDateFromStore) : undefined,
    });

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [filterSections, setFilterSections] = useState<FilterSection[]>([]);

    const { data: categoriesData, isLoading: categoriesLoading } = useGetPublicCategories();
    const { data: spaceTypesData, isLoading: spaceTypesLoading } = useGetSpaceTypes();
    const { data: amenitiesData, isLoading: amenitiesLoading } = useGetAmenities();
    const { data: activitiesData, isLoading: activitiesLoading } = useGetActivities();
    const { data: spaceTagsData, isLoading: spaceTagsLoading } = useGetGuestSpaceTags();

    const isSectionsLoading = spaceTypesLoading || amenitiesLoading || spaceTagsLoading;

    const filterParams = useMemo(() => {
        const getFormattedTime = (time: string | undefined) => {
            if (!time || !time.trim()) return undefined;
            return convert12to24(time);
        };

        const formattedStartTime = getFormattedTime(appliedFilters.startTime);
        const formattedEndTime = getFormattedTime(appliedFilters.endTime);

        return {
            ...(appliedFilters.date && { date: appliedFilters.date }),
            ...(formattedStartTime &&
                formattedStartTime.trim() && { startTime: formattedStartTime }),
            ...(formattedEndTime && formattedEndTime.trim() && { endTime: formattedEndTime }),
            cityId: appliedFilters.cityId || undefined,
            categoryIds: appliedFilters.categoryIds?.join(',') || undefined,
            spaceTypeIds: appliedFilters.spaceTypeIds.length
                ? appliedFilters.spaceTypeIds.join(',')
                : undefined,
            // Deprecated: activityIds is no longer supported — use tagIds for Admin Space Tags
            // activityIds: appliedFilters.activityIds.length
            //     ? appliedFilters.activityIds.join(',')
            //     : undefined,
            tagIds: appliedFilters.activityIds.length
                ? appliedFilters.activityIds.join(',')
                : undefined,
            amenityIds: appliedFilters.amenityIds.length
                ? appliedFilters.amenityIds.join(',')
                : undefined,
            attendees: appliedFilters.attendees || undefined,
            minPrice: appliedFilters.minPrice || undefined,
            maxPrice: appliedFilters.maxPrice || undefined,
            instantBooking: appliedFilters.instantBooking || undefined,
            range: appliedFilters.range || undefined,
            limit: LIMIT,
        };
    }, [appliedFilters]);


    useEffect(() => {
        const sections: FilterSection[] = [];
        if (spaceTypesData?.data?.spaceTypes) {
            sections.push({
                title: 'Choose Your',
                titleHighlighted: 'Space Type',
                key: 'space_types',
                options: spaceTypesData.data.spaceTypes.map((type) => ({
                    label: type.type,
                    ids: (type as any).ids,
                })),
            });
        }
        // Deprecated: Activities from useGetActivities — replaced by Admin Space Tags
        // if (activitiesData?.data?.activities) {
        //     sections.push({
        //         title: 'Choose',
        //         titleHighlighted: 'Activities',
        //         key: 'activities',
        //         options: activitiesData.data.activities.map((activity) => ({
        //             label: activity.activity,
        //             ids: (activity as any).ids,
        //         })),
        //     });
        // }
        const tagsArray = spaceTagsData?.data || [];
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
            sections.push({
                title: 'Choose',
                titleHighlighted: 'Activities',
                key: 'activities',
                options: tagsArray.map((tag: any) => ({
                    label: tag.name,
                    ids: [tag.id],
                })),
            });
        }
        if (amenitiesData?.data?.amenities) {
            sections.push({
                title: 'Choose from',
                titleHighlighted: 'Amenities',
                key: 'amenities',
                options: amenitiesData.data.amenities.map((amenity) => ({
                    label: amenity.name,
                    ids: (amenity as any).ids,
                })),
            });
        }
        setFilterSections(sections);
    }, [spaceTypesData, activitiesData, amenitiesData, spaceTagsData]);

    useEffect(() => {
        // Deprecated: resolve against activitiesData (host activities)
        // const resolvedActivityIds = selectedActivities.flatMap((active) => {
        //     if (active.ids && active.ids.length > 0) return active.ids;
        //     const matchedActivity = activitiesData?.data?.activities?.find(
        //         (a) => a.activity && active.name && a.activity.toLowerCase() === active.name.toLowerCase(),
        //     );
        //     if (matchedActivity) {
        //         return (matchedActivity as any).ids || [matchedActivity.id];
        //     }
        //     return [];
        // });

        // Resolve tag IDs from Admin Space Tags
        const tagsArray = spaceTagsData?.data || [];
        const resolvedTagIds = selectedActivities.flatMap((active) => {
            if (active.ids && active.ids.length > 0) return active.ids;
            const matchedTag = tagsArray.find(
                (t: any) => t.name && active.name && t.name.toLowerCase() === active.name.toLowerCase(),
            );
            if (matchedTag) {
                return [matchedTag.id];
            }
            return [];
        });

        setAppliedFilters((prev) => ({
            ...prev,
            categoryIds: selectedCategories.map((c) => Number(c.item.id)) || [],
            activityIds: selectedActivities.length === 0 ? [] : (resolvedTagIds.length > 0 ? resolvedTagIds : prev.activityIds),
            cityId: selectedPlace?.id,
            date: selectedDateFromStore ? new Date(selectedDateFromStore) : undefined,
        }));
    }, [
        selectedCategories,
        selectedActivities,
        selectedPlace,
        selectedDateFromStore,
        spaceTagsData,
    ]);

    // Read URL -> Redux on load
    useEffect(() => {
        if (initializedFromUrl) return;
        if (categoriesLoading || spaceTagsLoading) return;

        // Slug aliases: when these are detected in the URL, silently rewrite to the canonical slug
        const SPACE_SLUG_ALIASES: Record<string, string> = {
            'creative-spaces':     'photo-film-studio',
            'work-meeting-spaces': 'workshop-area',
            'workshops':           'workshop-area',
            'workshop':            'workshop-area',
        };

        const syncFromUrl = async () => {
            const rawSpaceParam = searchParams.get('space');

            // Remap aliased slugs → canonical slugs and update the URL in place
            let spaceParam = rawSpaceParam;
            if (rawSpaceParam) {
                const remapped = rawSpaceParam
                    .split(',')
                    .map((s) => SPACE_SLUG_ALIASES[s] ?? s)
                    .join(',');

                if (remapped !== rawSpaceParam) {
                    spaceParam = remapped;
                    const newParams = new URLSearchParams(searchParams.toString());
                    newParams.set('space', remapped);
                    router.replace(`?${newParams.toString()}`, { scroll: false });
                }
            }

            const activityParam = searchParams.get('activity');
            const locationParam = searchParams.get('location');
            const dateParam = searchParams.get('date');

            // Deprecated: resolve URL activity param against host activitiesData
            // if (activityParam && activitiesData?.data?.activities) {
            //     const activitySlugs = activityParam.split(',');
            //     const matchedActivities = activitiesData.data.activities
            //         .filter((a: any) => a.activity && activitySlugs.includes(toSlug(a.activity)))
            //         .map((a: any) => ({ name: a.activity, ids: a.ids }));
            //     if (matchedActivities.length > 0) {
            //         dispatch(setSelectedActivities(matchedActivities));
            //     }
            //     const drawerActivityIds = activitiesData.data.activities
            //         .filter((a: any) => a.activity && activitySlugs.includes(toSlug(a.activity)))
            //         .flatMap((a: any) => a.ids || [a.id]);
            //     setAppliedFilters(prev => ({
            //         ...prev,
            //         activityIds: Array.from(new Set([...prev.activityIds, ...drawerActivityIds])),
            //     }));
            // }

            // Resolve URL activity param against Admin Space Tags
            const urlTagsArray = spaceTagsData?.data || [];
            if (activityParam && urlTagsArray.length > 0) {
                const activitySlugs = activityParam.split(',');

                const matchedTags = urlTagsArray
                    .filter((t: any) => t.name && activitySlugs.includes(toSlug(t.name)))
                    .map((t: any) => ({ name: t.name, ids: [t.id] }));

                if (matchedTags.length > 0) {
                    dispatch(setSelectedActivities(matchedTags));
                }

                const drawerTagIds = urlTagsArray
                    .filter((t: any) => t.name && activitySlugs.includes(toSlug(t.name)))
                    .map((t: any) => t.id);

                setAppliedFilters(prev => ({
                    ...prev,
                    activityIds: Array.from(new Set([...prev.activityIds, ...drawerTagIds])),
                }));
            }

            const amenitiesParam = searchParams.get('amenities');
            if (amenitiesParam && amenitiesData?.data?.amenities) {
                const amenitySlugs = amenitiesParam.split(',');
                const amenityIds = amenitiesData.data.amenities
                    .filter((am: any) => am.name && amenitySlugs.includes(toSlug(am.name)))
                    .flatMap((am: any) => am.ids || [am.id]);

                setAppliedFilters(prev => ({
                    ...prev,
                    amenityIds: Array.from(new Set([...prev.amenityIds, ...amenityIds])),
                }));
            }

            if (spaceParam && categoriesData?.data?.categories) {
                const spaceSlugs = spaceParam.split(',');

                const matchedCategories = categoriesData.data.categories
                    .filter((c: any) => c.CategoryMaster?.name && spaceSlugs.includes(toSlug(c.CategoryMaster.name)))
                    .map((c: any) => ({
                        item: { id: String(c.categoryId), name: c.CategoryMaster?.name },
                        type: 'spaces'
                    }));

                if (matchedCategories.length > 0) {
                    dispatch(setSelectedCategories(matchedCategories));
                }

                let spaceTypeIds: number[] = [];
                if (spaceTypesData?.data?.spaceTypes) {
                    spaceTypeIds = spaceTypesData.data.spaceTypes
                        .filter((st: any) => st.type && spaceSlugs.includes(toSlug(st.type)))
                        .flatMap((st: any) => st.ids || [st.id]);
                }

                setAppliedFilters(prev => ({
                    ...prev,
                    spaceTypeIds: Array.from(new Set([...prev.spaceTypeIds, ...spaceTypeIds])),
                }));
            }

            if (locationParam) {
                try {
                    const response = await getPlacesData();
                    if (response?.status === 200) {
                        const { categories: places } = response.data?.data || {};
                        const matchedPlace = places?.find((p: any) => toSlug(p.City?.location || '') === toSlug(locationParam));
                        if (matchedPlace) {
                            const placeObj = { id: String(matchedPlace.cityId), name: matchedPlace.City.location };
                            dispatch(setSelectedPlace(placeObj));
                            dispatch(setPlacesSearchVal(matchedPlace.City.location));
                        }
                    }
                } catch (error) {
                    console.error('Error fetching places for URL sync:', error);
                }
            }

            if (dateParam) {
                const parsedDate = new Date(dateParam);
                if (!isNaN(parsedDate.getTime())) {
                    dispatch(setDate(parsedDate.toISOString()));
                }
            }

            const minPrice = searchParams.get('minPrice');
            const maxPrice = searchParams.get('maxPrice');
            const attendees = searchParams.get('attendees');
            const instant = searchParams.get('instant');
            const range = searchParams.get('range');

            setAppliedFilters(prev => ({
                ...prev,
                minPrice: minPrice ? parseFloat(minPrice) : prev.minPrice,
                maxPrice: maxPrice ? parseFloat(maxPrice) : prev.maxPrice,
                attendees: attendees ? parseInt(attendees) : prev.attendees,
                instantBooking: instant === 'true' ? true : prev.instantBooking,
                range: range || prev.range,
            }));

            setInitializedFromUrl(true);
        };

        syncFromUrl();
    }, [categoriesData, spaceTagsData, categoriesLoading, spaceTagsLoading, searchParams, dispatch, initializedFromUrl]);

    // Sync State -> URL on changes
    useEffect(() => {
        if (!initializedFromUrl) return;

        const params = new URLSearchParams(searchParams.toString());
        let changed = false;

        const categoryNames = selectedCategories.map((c: any) => c.item?.name).filter(Boolean);
        const spaceTypeNames: string[] = [];
        if (spaceTypesData?.data?.spaceTypes) {
            appliedFilters.spaceTypeIds.forEach(id => {
                const type = spaceTypesData.data.spaceTypes.find((t: any) => (t as any).ids?.includes(id) || t.id === id);
                if (type) spaceTypeNames.push(type.type);
            });
        }
        const spacesStr = Array.from(new Set([...categoryNames, ...spaceTypeNames])).map(toSlug).join(',');

        if (spacesStr) {
            if (params.get('space') !== spacesStr) { params.set('space', spacesStr); changed = true; }
        } else {
            if (params.has('space')) { params.delete('space'); changed = true; }
        }

        const activityNames = selectedActivities.map((a: any) => a.name).filter(Boolean);
        const drawerActivityNames: string[] = [];
        // Deprecated: resolve names from host activitiesData
        // if (activitiesData?.data?.activities) {
        //     appliedFilters.activityIds.forEach(id => {
        //         const act = activitiesData.data.activities.find((a: any) => (a as any).ids?.includes(id) || a.id === id);
        //         if (act) drawerActivityNames.push(act.activity);
        //     });
        // }
        // Resolve names from Admin Space Tags
        const urlSyncTagsArray = spaceTagsData?.data || [];
        if (urlSyncTagsArray.length > 0) {
            appliedFilters.activityIds.forEach(id => {
                const tag = urlSyncTagsArray.find((t: any) => t.id === id);
                if (tag) drawerActivityNames.push(tag.name);
            });
        }
        const activitiesStr = Array.from(new Set([...activityNames, ...drawerActivityNames])).map(toSlug).join(',');

        if (activitiesStr) {
            if (params.get('activity') !== activitiesStr) { params.set('activity', activitiesStr); changed = true; }
        } else {
            if (params.has('activity')) { params.delete('activity'); changed = true; }
        }

        const amenityNames: string[] = [];
        if (amenitiesData?.data?.amenities) {
            appliedFilters.amenityIds.forEach(id => {
                const am = amenitiesData.data.amenities.find((a: any) => (a as any).ids?.includes(id) || a.id === id);
                if (am) amenityNames.push(am.name);
            });
        }
        const amenitiesStr = Array.from(new Set(amenityNames)).map(toSlug).join(',');

        if (amenitiesStr) {
            if (params.get('amenities') !== amenitiesStr) { params.set('amenities', amenitiesStr); changed = true; }
        } else {
            if (params.has('amenities')) { params.delete('amenities'); changed = true; }
        }

        const locationStr = selectedPlace?.name ? toSlug(selectedPlace.name) : '';
        if (locationStr) {
            if (params.get('location') !== locationStr) { params.set('location', locationStr); changed = true; }
        } else {
            if (params.has('location')) { params.delete('location'); changed = true; }
        }

        const dateStr = selectedDateFromStore ? selectedDateFromStore.split('T')[0] : '';
        if (dateStr) {
            if (params.get('date') !== dateStr) { params.set('date', dateStr); changed = true; }
        } else {
            if (params.has('date')) { params.delete('date'); changed = true; }
        }

        if (appliedFilters.minPrice) {
            if (params.get('minPrice') !== String(appliedFilters.minPrice)) { params.set('minPrice', String(appliedFilters.minPrice)); changed = true; }
        } else if (params.has('minPrice')) { params.delete('minPrice'); changed = true; }

        if (appliedFilters.maxPrice) {
            if (params.get('maxPrice') !== String(appliedFilters.maxPrice)) { params.set('maxPrice', String(appliedFilters.maxPrice)); changed = true; }
        } else if (params.has('maxPrice')) { params.delete('maxPrice'); changed = true; }

        if (appliedFilters.attendees) {
            if (params.get('attendees') !== String(appliedFilters.attendees)) { params.set('attendees', String(appliedFilters.attendees)); changed = true; }
        } else if (params.has('attendees')) { params.delete('attendees'); changed = true; }

        if (appliedFilters.instantBooking) {
            if (params.get('instant') !== 'true') { params.set('instant', 'true'); changed = true; }
        } else if (params.has('instant')) { params.delete('instant'); changed = true; }

        if (appliedFilters.range) {
            if (params.get('range') !== appliedFilters.range) { params.set('range', appliedFilters.range); changed = true; }
        } else if (params.has('range')) { params.delete('range'); changed = true; }

        if (changed) {
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [selectedCategories, selectedActivities, selectedPlace, selectedDateFromStore, appliedFilters, searchParams, router, initializedFromUrl]);

    const handleSearchBarSearch = ({
        date,
        startTime,
        endTime,
        selectedCategory,
        selectedPlace,
    }) => {
        const isActivity = selectedCategory && 'ids' in selectedCategory;

        setAppliedFilters((prev) => {
            const nextFilters = {
                ...prev,
                cityId: selectedPlace?.id ? Number(selectedPlace.id) : prev.cityId,
                date: date || prev.date,
                startTime: startTime || prev.startTime,
                endTime: endTime || prev.endTime,
            };

            // Space and activity filters are independent — both can coexist
            if (isActivity) {
                nextFilters.activityIds = selectedCategory.ids || [];
            } else if (selectedCategory?.id) {
                nextFilters.categoryIds = [Number(selectedCategory.id)];
            }

            return nextFilters;
        });
    };

    const clearFilters = () => {
        dispatch(setSelectedActivities([]));
        dispatch(setSelectedCategories([]));
        dispatch(setSearchVal(''));
        setAppliedFilters((prev) => ({
            ...prev,
            spaceTypeIds: [],
            activityIds: [],
            amenityIds: [],
            minPrice: undefined,
            maxPrice: undefined,
            attendees: undefined,
            categoryIds: [],
            range: undefined,
        }));
    };

    const drawerSelected = useMemo(() => {
        const selected: Record<string, string[]> = {
            space_types: [],
            activities: [],
            amenities: [],
            categories: selectedCategories.map((c: any) => c.item?.name).filter(Boolean),
        };

        if (spaceTypesData?.data?.spaceTypes) {
            appliedFilters.spaceTypeIds.forEach(id => {
                const type = spaceTypesData.data.spaceTypes.find((t: any) => (t as any).ids?.includes(id) || t.id === id);
                if (type) selected.space_types.push(type.type);
            });
        }

        // Deprecated: resolve activity names from host activitiesData
        // if (activitiesData?.data?.activities) {
        //     appliedFilters.activityIds.forEach(id => {
        //         const act = activitiesData.data.activities.find((a: any) => (a as any).ids?.includes(id) || a.id === id);
        //         if (act) selected.activities.push(act.activity);
        //     });
        // }
        // Resolve activity names from Admin Space Tags
        const drawerTagsArray = spaceTagsData?.data || [];
        if (drawerTagsArray.length > 0) {
            appliedFilters.activityIds.forEach(id => {
                const tag = drawerTagsArray.find((t: any) => t.id === id);
                if (tag) selected.activities.push(tag.name);
            });
        }

        if (amenitiesData?.data?.amenities) {
            appliedFilters.amenityIds.forEach(id => {
                const am = amenitiesData.data.amenities.find((a: any) => (a as any).ids?.includes(id) || a.id === id);
                if (am) selected.amenities.push(am.name);
            });
        }

        selected.space_types = Array.from(new Set(selected.space_types));
        selected.activities = Array.from(new Set(selected.activities));
        selected.amenities = Array.from(new Set(selected.amenities));

        return selected;
    }, [appliedFilters.spaceTypeIds, appliedFilters.activityIds, appliedFilters.amenityIds, spaceTypesData, spaceTagsData, amenitiesData]);

    return {
        appliedFilters,
        setAppliedFilters,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        filterSections,
        limit: LIMIT,
        categoriesData,
        categoriesLoading,
        isSectionsLoading,
        activitiesLoading,
        isAuth,
        filterParams,
        handleSearchBarSearch,
        clearFilters,
        router,
        selectedCategories,
        selectedActivities,
        drawerSelected,
    };
};