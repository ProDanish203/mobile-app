import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.danish.aora",
  projectId: "66cf0b840019d71f3d8d",
  databaseId: "66cf0c9b003851f4f6e1",
  userCollectionId: "66cf0cb40011e3eb7fbb",
  videoCollectionId: "66cf0cc90001175dba01",
  storageId: "66cf0df60001155d44cd",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    const avatarUrl = avatars.getInitials(username);
    if (!newAccount) throw Error;
    await login({ email, password });

    const user = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    return currentAccount;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", [currentAccount.$id])]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getSearchResults = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) return [];

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("createdBy", userId)]
    );

    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getFilePreview = async ({
  fileId,
  type,
}: {
  fileId: string;
  type: string;
}) => {
  let fileUrl;
  try {
    if (type === "image")
      fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000);
    else if (type === "video")
      fileUrl = storage.getFileView(config.storageId, fileId);
    else throw new Error("Invalid file type");

    if (!fileUrl) throw Error();
    return fileUrl;
  } catch (error: any) {
    console.log("Get File Preview: ", error);
    throw new Error(error.message);
  }
};

export const uploadFile = async ({
  file,
  type,
}: {
  file: any;
  type: string;
}) => {
  if (!file) return;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview({ fileId: uploadedFile.$id, type });

    return fileUrl;
  } catch (error: any) {
    console.log("Upload File: ", error);
    throw new Error(error.message);
  }
};

export const createPost = async ({
  title,
  prompt,
  thumbnail,
  video,
  userId,
}: {
  title: string;
  prompt: string;
  video: string;
  thumbnail: string;
  userId: string;
}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile({ file: thumbnail, type: "image" }),
      uploadFile({ file: video, type: "video" }),
    ]);

    const post = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title,
        prompt,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        createdBy: userId,
      }
    );

    return post;
  } catch (error: any) {
    console.log("Create Post: ", error);
    throw new Error(error.message);
  }
};
