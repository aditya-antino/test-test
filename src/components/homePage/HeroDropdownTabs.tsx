'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@/components/ui/tabs';
import { getCategoriesData } from '@/services/guest/categories.services';
import { handleApiError } from '@/hooks/handleApiError';
import { RootState } from '@/store/store';
import { setSelectedCategories, setSelectedActivities } from '@/store/slice/homePageSearchSlice';
import { useGetActivities, useGetGuestSpaceTags } from '@/services';
import { cn } from '@/lib/utils';

type Item = {
    id: string;
    name: string;
    ids?: number[];
};

interface HeroDropdownTabsProps {
    isOpen: boolean;
    searchVal: string;
    onSelect: (item: Item, type: 'spaces' | 'activities') => void;
    onClose: () => void;
}

function ShimmerList() {
    return (
        <div>
            {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-6 w-full bg-gray-200 rounded-md mb-2 animate-pulse" />
            ))}
        </div>
    );
}

const tabsData = [
    { label: 'Spaces', value: 'spaces' },
    { label: 'Activities', value: 'activities' }
];

export default function HeroSpacesDropdown({
    isOpen,
    searchVal,
    onSelect,
    onClose,
}: HeroDropdownTabsProps) {
    const dispatch = useDispatch();

    const { selectedCategories, selectedActivities } = useSelector(
        (state: RootState) => state.homeSearchData,
    );

    const selectedCategory = selectedCategories.length ? selectedCategories[0] : undefined;
    const selectedActivity = selectedActivities.length ? selectedActivities[0] : undefined;

    const [activeTab, setActiveTab] = useState<'spaces' | 'activities'>('spaces');
    const [spaces, setSpaces] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    const { data: activitiesData, isLoading: activitiesLoading } = useGetActivities();
    const { data: spaceTagsResponse, isLoading: spaceTagsLoading } = useGetGuestSpaceTags();

    useEffect(() => {
        fetchSpaces();
    }, []);

    async function fetchSpaces() {
        try {
            setLoading(true);
            const response = await getCategoriesData();
            if (response?.status === 200) {
                const { categories } = response.data?.data || {};
                const data: Item[] =
                    categories?.map((item: any) => ({
                        id: String(item.categoryId),
                        name: item?.CategoryMaster?.name ?? 'Untitled',
                    })) || [];
                setSpaces(data);
            } else {
                setSpaces([]);
            }
        } catch (error) {
            handleApiError(error);
            setSpaces([]);
        } finally {
            setLoading(false);
        }
    }

    function getData() {
        if (activeTab === 'spaces') return spaces;
        if (activeTab === 'activities') {
            const rawTags = spaceTagsResponse?.data?.tags || spaceTagsResponse?.data || [];
            return (
                rawTags.map((item: any) => ({
                    id: String(item.id || item.ids?.[0]),
                    name: item.name || item.tag || item.activity || 'Untitled',
                    ids: item.ids || [item.id],
                })) || []
            );
        }
        return [];
    }

    function handleSelect(item: Item) {
        if (activeTab === 'spaces') {
            const alreadySelected = selectedCategory?.item?.id === item.id;
            if (alreadySelected) {
                dispatch(setSelectedCategories([]));
            } else {
                dispatch(setSelectedCategories([{ item, type: activeTab }]));
                onSelect(item, activeTab);
            }
        } else if (activeTab === 'activities') {
            const alreadySelected = selectedActivity?.name === item.name;
            if (alreadySelected) {
                dispatch(setSelectedActivities([]));
            } else {
                dispatch(
                    setSelectedActivities([
                        {
                            name: item.name,
                            ids: item.ids || [Number(item.id)],
                        },
                    ]),
                );
                onSelect(item, activeTab);
            }
        }
        onClose();
    }

    function handleTabChange(tab: string) {
        setActiveTab(tab as 'spaces' | 'activities');
    }

    // Determine if the user is actively typing a search term, 
    // or if the search value is just the name of the currently selected category/activity.
    const isEditingSearch = useMemo(() => {
        if (!searchVal.trim()) return false;
        const val = searchVal.trim().toLowerCase();
        // Not editing if searchVal matches any selected category or activity name
        if (selectedCategory && val === selectedCategory.item.name.toLowerCase()) return false;
        if (selectedActivity && val === selectedActivity.name.toLowerCase()) return false;
        return true;
    }, [searchVal, selectedCategory, selectedActivity]);

    const filteredData = useMemo(() => {
        const data = getData();
        if (!isEditingSearch) return data;
        const query = searchVal.trim().toLowerCase();
        return data.filter((item) =>
            item.name.toLowerCase().includes(query)
        );
    }, [activeTab, spaces, spaceTagsResponse, searchVal, isEditingSearch]);

    function RenderOptions() {
        const data = filteredData;
        if (data.length === 0) {
            return (
                <p className="text-sm text-gray-500 p-3">
                    {activeTab === 'spaces' ? 'No spaces found' : 'No activities found'}
                </p>
            );
        }

        return (
            <div className="p-2 pt-0">
                {isEditingSearch && (
                    <p className="text-sm text-slate-400 pb-2 pt-1">
                        Showing all matches for "{searchVal}"
                    </p>
                )}
                {data.map((item) => {
                    const isSelected = activeTab === 'spaces'
                        ? selectedCategory?.item?.id === item.id
                        : selectedActivity?.name === item.name;
                    const isMatch =
                        searchVal.trim() &&
                        item.name.toLowerCase().includes(searchVal.toLowerCase());
                    return (
                        <div
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={cn(
                                "group px-4 py-3 cursor-pointer rounded-xl transition-all flex items-center justify-between mb-1 last:mb-0",
                                isSelected ? "bg-[#F6CD28]/10" : "hover:bg-gray-50"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm transition-colors",
                                    isSelected
                                        ? "font-bold text-gray-900"
                                        : isMatch
                                            ? "text-[#F6CD28] font-medium"
                                            : "text-gray-700 group-hover:text-gray-900"
                                )}
                            >
                                {item.name}
                            </span>
                            {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-[#F6CD28]" />
                            )}
                            {isMatch && !isSelected && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6CD28]">
                                    Match
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    if (!isOpen) return null;

    const activeLoading = activeTab === 'spaces' ? loading : spaceTagsLoading;
    const activeData = getData();

    return (
        <div className="max-h-96 overflow-y-auto">
            <Tabs
                tabs={tabsData}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                variant="underline"
                className="mb-2 sticky top-0 bg-white z-10"
            />
            {activeLoading ? (
                <ShimmerList />
            ) : filteredData.length > 0 ? (
                <RenderOptions />
            ) : (
                <p className="text-sm text-gray-500 p-3">
                    {activeTab === 'spaces' ? 'No spaces found' : 'No activities found'}
                </p>
            )}
        </div>
    );
}
