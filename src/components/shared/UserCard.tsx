import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

type UserCardProps = {
        user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
        return (
                <div className="user-card">
                        <Link to={`/profile/${user.$id}`} className="px-4">
                                <img
                                        src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                                        alt="Creator"
                                        className="rounded-full w-16 h-16 mx-auto mb-4"
                                />
                                <div className="flex-center flex-col gap-1">
                                        <p className="base-medium text-light-1 text-center line-clamp-1">{user.name}</p>
                                        <p className="small-regular text-light-3 text-center line-clamp-1">
                                                @{user.username}
                                        </p>
                                </div>
                        </Link>
                        <Button type="button" size="sm" className="shad-button_primary px-5">
                                Follow
                        </Button>
                </div>
        );
};

export default UserCard;
