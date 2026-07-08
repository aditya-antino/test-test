export const mapRawSpace = (space: any) => ({
    ...space,
    price: parseFloat(space.pricePerHour) || 0,
    rating: parseFloat(space.avgRating) || 0,
    reviews: parseInt(space.reviewCount) || 0,
    seats: space.capacity,
    discountAmount: space.discountAmount || 0,
    isWishlist: space.isWishlist,
    isRefundable: space.isRefundable,
});

export const toMapMarker = (space: any, includeImage = false) => ({
    id: space?.id,
    title: space?.title,
    slug: space?.slug,
    location: space?.location,
    pricePerHour: space?.pricePerHour,
    ...(includeImage && { image: space?.spaceImages?.[0] || '' }),
    discountAmount: space?.discountAmount ?? space?.SpaceListing?.discountAmount ?? 0,
    isRefundable: space?.isRefundable ?? space?.SpaceListing?.isRefundable ?? false,
});

// Shared prop interface for both Mobile and Desktop list sub-components
export interface SpaceListSectionProps {
    filterParams: any;
    isAuth: boolean;
    handleSpaceClick: (slug: string) => void;
    clearFilters: () => void;
}
