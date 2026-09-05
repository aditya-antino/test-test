'use client';
import React from 'react';
import Image from 'next/image';
import ArrowScrollWrapper from '@/components/ui/arrowScrollWrapper';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSelectedCategories, setSelectedActivities } from '@/store/slice/homePageSearchSlice';
import { toast } from 'react-toastify';
import { PATHS } from '@/constants/path';
import {
    artGallery,
    artWorkshop,
    baithak,
    bhajanClubbing,
    bookClub,
    brandPopup,
    communityMeet,
    cyclorama,
    dance,
    kitchen,
    livingRoom,
    meetUp,
    outdoor,
    performance,
    podcastIconNew,
    screening,
    soundHealing,
    supperClub,
    theatre,
    warehouse,
    yoga,
} from '@/assets/activitiesIcon';

interface StaticActivity {
    activity: string;
    icon?: any;
    id: string;
    key: string;
}

const STATIC_ACTIVITIES: StaticActivity[] = [
    { activity: 'Art Gallery',      icon: artGallery,     id: 'art-gallery',       key: 'art-gallery' },
    { activity: 'Art Workshops',      icon: artWorkshop,    id: 'art-workshops',     key: 'art-workshops' },
    { activity: 'Baithak',           icon: baithak,        id: 'baithak',           key: 'baithaks' },
    { activity: 'Bhajan Clubbing',   icon: bhajanClubbing, id: 'bhajan-clubbing',   key: 'bhajan-clubbing' },
    { activity: 'Book Launch',         icon: bookClub,       id: 'book-launch',       key: 'book-launch' },
    { activity: 'Brand Pop Up',      icon: brandPopup,     id: 'brand-pop-up',      key: 'brand-pop-up' },
    { activity: 'Community Meetup',  icon: communityMeet,  id: 'community-meetup',  key: 'meet-up' },
    { activity: 'Cyclorama',         icon: cyclorama,      id: 'cyclorama-studios', key: 'cyclorama-studios' },
    { activity: 'Dance Rehearsal',   icon: dance,          id: 'dance-rehearsal',   key: 'dance-rehearsal' },
    { activity: 'Kitchen',           icon: kitchen,        id: 'kitchen',           key: 'kitchen-setup' },
    { activity: 'Living Room',       icon: livingRoom,     id: 'living-room',       key: 'living-room' },
    { activity: 'Meet Up',           icon: meetUp,         id: 'meet-up',           key: 'meet-up' },
    { activity: 'Outdoor Space',     icon: outdoor,        id: 'outdoor-space',     key: 'outdoor-space' },
    { activity: 'Performance',       icon: performance,    id: 'performance',       key: 'performance' },
    { activity: 'Podcast',           icon: podcastIconNew, id: 'podcast-studios',   key: 'podcast' },
    { activity: 'Screening Space',   icon: screening,      id: 'screening-space',   key: 'screening-spaces' },
    { activity: 'Sound Healing',     icon: soundHealing,   id: 'sound-healing',     key: 'sound-healing' },
    { activity: 'Supper Club',       icon: supperClub,     id: 'supper-club',       key: 'supper-club' },
    { activity: 'Theatre',           icon: theatre,        id: 'theatre',           key: 'theatre' },
    { activity: 'Warehouse Studio',  icon: warehouse,      id: 'warehouse-studio',  key: 'warehouse-studio' },
    { activity: 'Yoga',              icon: yoga,           id: 'yoga',              key: 'yoga' },
];

interface ActivityCardProps {
    activity: StaticActivity;
    onClick: (activity: StaticActivity) => void;
}

const renderActivityIcon = (icon: any, title: string) => {
    return (
        <Image
            src={icon}
            alt={title}
            width={64}
            height={64}
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
        />
    );
};

const ActivityCard = React.memo(function ActivityCard({ activity, onClick }: ActivityCardProps) {
    const handleClick = React.useCallback(() => {
        onClick(activity);
    }, [onClick, activity]);

    return (
        <div
            className="flex flex-col items-center gap-3 cursor-pointer group min-w-[110px] px-2 pb-1 pt-1 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
            onClick={handleClick}
        >
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-white/30 border border-gray-100 shadow-sm transition-all duration-300 group-hover:border-[#F7CD29]/50 group-hover:shadow-[0_4px_12px_rgba(247,205,41,0.2)]">
                {renderActivityIcon(activity.icon, activity.activity)}
            </div>
            <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-gray-900 whitespace-nowrap text-center transition-colors">
                {activity?.activity || 'Untitled'}
            </p>
        </div>
    );
});

const BrowseByActivities = React.memo(function BrowseByActivities() {
    const router = useRouter();
    const dispatch = useDispatch();

    const handlePressSearch = React.useCallback(
        (activity: StaticActivity) => {
            if (activity) {
                dispatch(setSelectedCategories([]));
                dispatch(
                    setSelectedActivities([
                        {
                            name: activity.activity,
                            ids: [],
                        },
                    ]),
                );
                const params = new URLSearchParams();
                params.append('activity', activity.key);
                router.push(`${PATHS.SPACE_LISTING_PAGE_GUEST || '/space-list'}?${params.toString()}`);
                return;
            }
            toast.error('Something went wrong!!');
        },
        [dispatch, router],
    );

    return (
        <section className="pt-8 pb-2 px-4 md:px-16 flex flex-col items-center w-full bg-white">
            <div className="text-center mb-6 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                    Browse spaces by <span className="text-[#F7CD29]">Activity</span>
                </h2>
                <p className="text-black text-sm md:text-base font-medium mt-2 max-w-xl">
                    Whether you&apos;re hosting an event, recording a podcast, or planning a
                    photoshoot, we have the ideal space for you.
                </p>
            </div>

            <div className="w-full flex justify-center">
                <ArrowScrollWrapper
                    autoScroll={true}
                    autoScrollInterval={3000}
                    gapClassName="gap-6 md:gap-10"
                    arrowTopClassName="flex top-[48px] -translate-y-1/2 md:top-[56px]"
                >
                    {STATIC_ACTIVITIES.map((activity: StaticActivity) => (
                        <ActivityCard
                            key={activity.key}
                            activity={activity}
                            onClick={handlePressSearch}
                        />
                    ))}
                </ArrowScrollWrapper>
            </div>
        </section>
    );
});

export default BrowseByActivities;
