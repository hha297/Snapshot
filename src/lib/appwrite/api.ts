import { INewPost, INewUser, IUpdatePost } from '@/types';
import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases, storage } from './config';

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
        try {
                const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
                if (!newAccount) throw Error;

                const avatarUrl = avatars.getInitials(user.name);

                const newUser = await saveUserToDB({
                        accountId: newAccount.$id,
                        name: newAccount.name,
                        email: newAccount.email,
                        username: user.username,
                        imageUrl: avatarUrl,
                });
                return newUser;
        } catch (error) {
                console.log(error);
                return error;
        }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
        accountId: string;
        email: string;
        name: string;
        username?: string;
        imageUrl: URL;
}) {
        try {
                const newUser = await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.userCollectionId,
                        ID.unique(),
                        user,
                );

                return newUser;
        } catch (error) {
                console.log(error);
        }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
        try {
                const session = await account.createEmailPasswordSession(user.email, user.password);

                return session;
        } catch (error) {
                console.log(error);
        }
}

// ============================== GET ACCOUNT
export async function getAccount() {
        try {
                const currentAccount = await account.get();
                return currentAccount;
        } catch (error) {
                console.log(error);
        }
}

// ============================== GET USER
export async function getCurrentUser() {
        try {
                const currentAccount = await getAccount();
                if (!currentAccount) throw Error;

                const currentUser = await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.userCollectionId,
                        [Query.equal('accountId', currentAccount.$id)],
                );

                if (!currentUser) throw Error;
                return currentUser.documents[0];
        } catch (error) {
                console.log(error);
                return null;
        }
}

// ============================== SIGN OUT
export async function signOutAccount() {
        try {
                const session = await account.deleteSession('current');
                return session;
        } catch (error) {
                console.log(error);
        }
}

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post: INewPost) {
        try {
                // Upload image to storage
                const uploadedFile = await uploadFile(post.file[0]);
                if (!uploadedFile) throw Error;

                // Get file URL
                const fileUrl = getFilePreview(uploadedFile.$id);
                if (!fileUrl) {
                        deleteFile(uploadedFile.$id);

                        throw Error;
                }

                // Convert tags to an array
                const tags = post.tags?.replace(/ /g, '').split(',') || [];

                // Save post to database
                const newPost = await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        ID.unique(),
                        {
                                creator: post.userId,
                                caption: post.caption,
                                imageUrl: fileUrl,
                                imageId: uploadedFile.$id,
                                location: post.location,
                                tags: tags,
                        },
                );

                if (!newPost) {
                        await deleteFile(uploadedFile.$id);
                        throw Error;
                }

                return newPost;
        } catch (error) {
                console.log(error);
        }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
        try {
                const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);

                return uploadedFile;
        } catch (error) {
                console.log(error);
        }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
        try {
                const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
                if (!fileUrl) throw Error;

                return fileUrl;
        } catch (error) {
                console.log(error);
        }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
        try {
                await storage.deleteFile(appwriteConfig.storageId, fileId);

                return { status: 'Deleted Successfully' };
        } catch (error) {
                console.log(error);
        }
}

// ============================== GET RECENT POSTS
export async function getRecentPosts() {
        try {
                const posts = await databases.listDocuments(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        [Query.orderDesc('$createdAt'), Query.limit(20)],
                );

                if (!posts) throw Error;
                return posts;
        } catch (error) {
                console.log(error);
        }
}

// ============================== LIKE / UNLIKE POST
export async function likePost(postId: string, likesArray: string[]) {
        try {
                const updatedPost = await databases.updateDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        postId,
                        { likes: likesArray },
                );

                if (!updatedPost) throw Error;
                return updatedPost;
        } catch (error) {
                console.log(error);
        }
}

// ============================== SAVE POST
export async function savePost(postId: string, userId: string[]) {
        try {
                const updatedPost = await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.savesCollectionId,
                        ID.unique(),
                        {
                                user: userId,
                                post: postId,
                        },
                );

                if (!updatedPost) throw Error;
                return updatedPost;
        } catch (error) {
                console.log(error);
        }
}

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
        try {
                const statusCode = await databases.deleteDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.savesCollectionId,
                        savedRecordId,
                );

                if (!statusCode) throw Error;

                return { status: 'OK' };
        } catch (error) {
                console.log(error);
        }
}

// ============================== GET POST BY ID
export async function getPostById(postId?: string) {
        if (!postId) throw Error;
        try {
                const post = await databases.getDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        postId,
                );

                if (!post) throw Error;
                return post;
        } catch (error) {
                console.log(error);
        }
}

// ============================== UPDATE POST
export async function updatePost(post: IUpdatePost) {
        const hasFileToUpdate = post.file.length > 0;

        try {
                let image = {
                        imageUrl: post.imageUrl,
                        imageId: post.imageId,
                };

                if (hasFileToUpdate) {
                        // Upload new file to appwrite storage
                        const uploadedFile = await uploadFile(post.file[0]);
                        if (!uploadedFile) throw Error;

                        // Get new file url
                        const fileUrl = getFilePreview(uploadedFile.$id);
                        if (!fileUrl) {
                                await deleteFile(uploadedFile.$id);
                                throw Error;
                        }

                        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
                }

                // Convert tags into array
                const tags = post.tags?.replace(/ /g, '').split(',') || [];

                //  Update post
                const updatedPost = await databases.updateDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        post.postId,
                        {
                                caption: post.caption,
                                imageUrl: image.imageUrl,
                                imageId: image.imageId,
                                location: post.location,
                                tags: tags,
                        },
                );

                // Failed to update
                if (!updatedPost) {
                        // Delete new file that has been recently uploaded
                        if (hasFileToUpdate) {
                                await deleteFile(image.imageId);
                        }

                        // If no new file uploaded, just throw error
                        throw Error;
                }

                // Safely delete old file after successful update
                if (hasFileToUpdate) {
                        await deleteFile(post.imageId);
                }

                return updatedPost;
        } catch (error) {
                console.log(error);
        }
}

// ============================== DELETE POST
export async function deletePost(postId?: string, imageId?: string) {
        if (!postId || !imageId) return;

        try {
                const statusCode = await databases.deleteDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.postCollectionId,
                        postId,
                );

                if (!statusCode) throw Error;

                await deleteFile(imageId);

                return { status: 'OK' };
        } catch (error) {
                console.log(error);
        }
}
