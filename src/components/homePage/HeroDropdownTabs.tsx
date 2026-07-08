'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from '@/components/ui/tabs';
import { getCategoriesData } from '@/services/guest/categories.services';
import { handleApiError } from '@/hooks/handleApiError';
import { RootState } from '@/store/store';
import { setSelectedCategories, setSelectedActivities } from '@/store/slice/homePageSearchSlice';
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
];

export default function HeroSpacesDropdown({
    isOpen,
    searchVal,
    onSelect,
    onClose,
}: HeroDropdownTabsProps) {
    const dispatch = useDispatch();

    const { selectedCategories } = useSelector(
        (state: RootState) => state.homeSearchData,
    );

    const selectedCategory = selectedCategories.length ? selectedCategories[0] : undefined;

    const [activeTab] = useState<'spaces'>('spaces');
    const [spaces, setSpaces] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

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

    function handleSelect(item: Item) {
        onSelect(item, 'spaces');
        dispatch(setSelectedActivities([]));
        dispatch(setSelectedCategories([{ item, type: 'spaces' }]));
        onClose();
    }

    function handleTabChange() {
        // Single tab, no-op
    }

    // Determine if the user is actively typing a search term, 
    // or if the search value is just the name of the currently selected category.
    const isEditingSearch = useMemo(() => {
        if (!searchVal.trim()) return false;
        if (!selectedCategory) return true;
        return searchVal.trim().toLowerCase() !== selectedCategory.item.name.toLowerCase();
    }, [searchVal, selectedCategory]);

    const filteredSpaces = useMemo(() => {
        return spaces.filter((item) =>
            isEditingSearch
                ? item.name.toLowerCase().includes(searchVal.toLowerCase())
                : true
        );
    }, [spaces, searchVal, isEditingSearch]);

    function RenderOptions() {
        if (filteredSpaces.length === 0) {
            return <p className="text-sm text-gray-500 p-3">No spaces found</p>;
        }

        return (
            <div className="p-2">
                {filteredSpaces.map((item) => {
                    const isSelected = selectedCategory?.item?.id === item.id;
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
                                    isSelected ? "font-bold text-gray-900" : "text-gray-700 group-hover:text-gray-900",
                                    isMatch && !isSelected && "font-semibold text-[#F6CD28]"
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

    return (
        <div className="max-h-96 overflow-y-auto">
            <Tabs
                tabs={tabsData}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                variant="underline"
                className="mb-3 sticky top-0 bg-white z-10"
            />
            {loading ? (
                <ShimmerList />
            ) : spaces.length > 0 ? (
                <div>
                    {searchVal && (
                        <div className="text-sm text-gray-500 mb-2 px-3">
                            {isEditingSearch
                                ? `Showing spaces matching "${searchVal}"`
                                : `Showing all spaces, highlighting matches for "${searchVal}"`}
                        </div>
                    )}
                    <RenderOptions />
                </div>
            ) : (
                <p className="text-sm text-gray-500">No spaces found</p>
            )}
        </div>
    );
}
