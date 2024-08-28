import { Account, Client, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.danish.aora",
  projectId: "66cf0b840019d71f3d8d",
  databaseId: "66cf0c9b003851f4f6e1",
  userCollectiond: "66cf0cb40011e3eb7fbb",
  videoCollectionId: "66cf0cc90001175dba01",
  storageId: "66cf0df60001155d44cd",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

export const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const user = await account.create(ID.unique(), email, password, username);
  return user;
  //   account.create(ID.unique(), email, password, username).then(
  //     function (response) {
  //       console.log(response);
  //     },
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
};
