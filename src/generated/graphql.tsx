import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
};

export type AddUserInput = {
  username: Scalars['String'];
};

export type AddUserMutationResponse = {
  __typename?: 'AddUserMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  friend?: Maybe<User>;
  me?: Maybe<User>;
};

export type Category = {
  __typename?: 'Category';
  avatar?: Maybe<Scalars['String']>;
  chatUsers?: Maybe<Array<User>>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type CategoryMutationResponse = {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
  errors?: Maybe<Array<FieldError>>;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: User;
  id: Scalars['String'];
  post: Post;
  updatedAt: Scalars['String'];
};

export type CommentInput = {
  body: Scalars['String'];
  postId: Scalars['ID'];
};

export type CommentMutationResponse = {
  __typename?: 'CommentMutationResponse';
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type CreatePostInput = {
  categoryId: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  imageH?: InputMaybe<Scalars['Int']>;
  imageW?: InputMaybe<Scalars['Int']>;
  link?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type EditPostInput = {
  categoryId: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  imageH?: InputMaybe<Scalars['String']>;
  imageW?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type EditUserInput = {
  about?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['Email']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['Email'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  category: Category;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  sentBy: User;
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  categoryId: Scalars['ID'];
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: AddUserMutationResponse;
  createCategory: CategoryMutationResponse;
  createComment: CommentMutationResponse;
  createMessage: Scalars['Boolean'];
  createPost: PostMutationResponse;
  deletePost: PostMutationResponse;
  editComment: CommentMutationResponse;
  editPost: PostMutationResponse;
  editUser: UserMutationResponse;
  forgotPassword: Scalars['Boolean'];
  joinChatRoom: UserLeaveJoinSubResponse;
  leaveChatRoom: UserLeaveJoinSubResponse;
  login: UserMutationResponse;
  logout: UserLogoutMutationResponse;
  register: UserMutationResponse;
  sendPrivateMessage: Scalars['Boolean'];
  vote: VoteMutationResponse;
};


export type MutationAddFriendArgs = {
  data: AddUserInput;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateCommentArgs = {
  data: CommentInput;
};


export type MutationCreateMessageArgs = {
  data: MessageInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationDeletePostArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type MutationEditCommentArgs = {
  data: CommentInput;
};


export type MutationEditPostArgs = {
  data: EditPostInput;
};


export type MutationEditUserArgs = {
  data: EditUserInput;
};


export type MutationForgotPasswordArgs = {
  email: EditUserInput;
};


export type MutationJoinChatRoomArgs = {
  data: CategoryInput;
};


export type MutationLeaveChatRoomArgs = {
  data: CategoryInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationSendPrivateMessageArgs = {
  data: PrivateMessageInput;
};


export type MutationVoteArgs = {
  data: VoteInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  category: Category;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  imageH?: Maybe<Scalars['Int']>;
  imageW?: Maybe<Scalars['Int']>;
  link?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  totalComments?: Maybe<_QueryMeta>;
  totalVotes?: Maybe<_QueryMeta>;
  updatedAt: Scalars['String'];
  votes?: Maybe<Array<Vote>>;
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  sentBy: User;
  sentTo: User;
  updatedAt: Scalars['String'];
};

export type PrivateMessageInput = {
  body: Scalars['String'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  _allPostsMeta: _QueryMeta;
  _categoryPostsMeta: _QueryMeta;
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  comment: Comment;
  comments?: Maybe<Array<Comment>>;
  me?: Maybe<User>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Message>>;
  myChatRooms?: Maybe<Array<Category>>;
  myFriends?: Maybe<Array<User>>;
  myPrivateMessages?: Maybe<Array<PrivateMessage>>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  privateMessage?: Maybe<PrivateMessage>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type Query_CategoryPostsMetaArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoriesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
};


export type QueryCommentArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryCommentsArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryMessagesArgs = {
  categoryId: Scalars['ID'];
};


export type QueryPostArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  category?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  data: EditUserInput;
};

export type RegisterInput = {
  about?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['Email'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newPrivateMessage: PrivateMessage;
  newUser: User;
};


export type SubscriptionNewMessageArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionNewPrivateMessageArgs = {
  userId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  chatRooms: Array<Category>;
  createdAt: Scalars['String'];
  email: Scalars['Email'];
  friends: Array<User>;
  id: Scalars['String'];
  online?: Maybe<Scalars['Boolean']>;
  privateMessages: Array<PrivateMessage>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserLeaveJoinSubResponse = {
  __typename?: 'UserLeaveJoinSubResponse';
  category?: Maybe<Category>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserLogoutMutationResponse = {
  __typename?: 'UserLogoutMutationResponse';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['String']>;
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Message>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  castBy: User;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
  value: Scalars['Int'];
};

export type VoteInput = {
  postId: Scalars['ID'];
  value: Scalars['Int'];
};

export type VoteMutationResponse = {
  __typename?: 'VoteMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
  vote?: Maybe<Vote>;
};

export type _QueryMeta = {
  __typename?: '_QueryMeta';
  count?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
};

export type CategoryDetailsFragment = { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string };

export type CommentDetailsFragment = { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string };

export type PostDetailsFragment = { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, imageH?: number | null, imageW?: number | null, text?: string | null, image?: string | null, link?: string | null };

export type UserDetailsFragment = { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null };

export type UserMeDetailsFragment = { __typename?: 'User', id: string, username: string, email: any, about?: string | null, online?: boolean | null, avatar?: string | null };

export type CreateSubredditMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type CreateSubredditMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryMutationResponse', category?: { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type JoinChatRoomMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type JoinChatRoomMutation = { __typename?: 'Mutation', joinChatRoom: { __typename?: 'UserLeaveJoinSubResponse', category?: { __typename?: 'Category', id: string, name: string, chatUsers?: Array<{ __typename?: 'User', id: string, username: string }> | null } | null } };

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentMutationResponse', comment?: { __typename?: 'Comment', id: string, body: string, createdBy: { __typename?: 'User', id: string, username: string }, post: { __typename?: 'Post', id: string } } | null, post?: { __typename?: 'Post', id: string, title: string, totalComments?: { __typename?: '_QueryMeta', count?: number | null } | null, totalVotes?: { __typename?: '_QueryMeta', count?: number | null } | null, comments?: Array<{ __typename?: 'Comment', id: string, createdBy: { __typename?: 'User', username: string } }> | null } | null } };

export type CreateMessageMutationVariables = Exact<{
  data: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: boolean };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', post?: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, imageH?: number | null, imageW?: number | null, text?: string | null, image?: string | null, link?: string | null, comments?: Array<{ __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string, createdBy: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null } }> | null, author: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null }, category: { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string }, totalComments?: { __typename?: '_QueryMeta', count?: number | null } | null, totalVotes?: { __typename?: '_QueryMeta', score?: number | null, count?: number | null } | null } | null } };

export type DeletePostMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', post?: { __typename?: 'Post', id: string } | null } };

export type EditPostMutationVariables = Exact<{
  data: EditPostInput;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'PostMutationResponse', post?: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, imageH?: number | null, imageW?: number | null, text?: string | null, image?: string | null, link?: string | null, category: { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AddFriendMutationVariables = Exact<{
  data: AddUserInput;
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'AddUserMutationResponse', me?: { __typename?: 'User', id: string, username: string } | null, friend?: { __typename?: 'User', id: string, username: string, online?: boolean | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type EditUserMutationVariables = Exact<{
  data: EditUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserMutationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, about?: string | null, email: any, avatar?: string | null } | null } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, email: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserLogoutMutationResponse', message?: string | null, success?: string | null } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', user?: { __typename?: 'User', id: string, username: string, email: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SendPrivateMessageMutationVariables = Exact<{
  data: PrivateMessageInput;
}>;


export type SendPrivateMessageMutation = { __typename?: 'Mutation', sendPrivateMessage: boolean };

export type CreateVoteMutationVariables = Exact<{
  data: VoteInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VoteMutationResponse', vote?: { __typename?: 'Vote', value: number, id: string } | null, post?: { __typename?: 'Post', id: string, totalVotes?: { __typename?: '_QueryMeta', count?: number | null, score?: number | null } | null } | null } };

export type CategoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string }> | null };

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type CategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id: string, name: string, chatUsers?: Array<{ __typename?: 'User', id: string, username: string, online?: boolean | null }> | null } | null };

export type CommentQueryVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
}>;


export type CommentQuery = { __typename?: 'Query', comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string, createdBy: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null } } };

export type CommentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  postId?: InputMaybe<Scalars['ID']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: Array<{ __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string, createdBy: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null } }> | null };

export type CommentsForPostQueryVariables = Exact<{
  postId: Scalars['ID'];
  orderBy?: InputMaybe<Scalars['String']>;
}>;


export type CommentsForPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, comments?: Array<{ __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string, createdBy: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null } }> | null } | null };

export type ChatRoomMessagesQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type ChatRoomMessagesQuery = { __typename?: 'Query', messages?: Array<{ __typename?: 'Message', id: string, content: string, sentBy: { __typename?: 'User', id: string, username: string }, category: { __typename?: 'Category', id: string, name: string } }> | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, imageH?: number | null, imageW?: number | null, text?: string | null, image?: string | null, link?: string | null, category: { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string }, author: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null }, comments?: Array<{ __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string }> | null, totalComments?: { __typename?: '_QueryMeta', count?: number | null } | null, totalVotes?: { __typename?: '_QueryMeta', score?: number | null, count?: number | null } | null } | null };

export type PostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, imageH?: number | null, imageW?: number | null, text?: string | null, image?: string | null, link?: string | null, category: { __typename?: 'Category', id: string, createdAt: string, updatedAt: string, name: string }, author: { __typename?: 'User', id: string, createdAt: string, updatedAt: string, username: string, online?: boolean | null }, comments?: Array<{ __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, body: string }> | null, totalComments?: { __typename?: '_QueryMeta', count?: number | null } | null, totalVotes?: { __typename?: '_QueryMeta', score?: number | null, count?: number | null } | null }> | null, _allPostsMeta: { __typename?: '_QueryMeta', count?: number | null }, _categoryPostsMeta: { __typename?: '_QueryMeta', count?: number | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: any, about?: string | null, online?: boolean | null, avatar?: string | null } | null };

export type MyChatRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyChatRoomsQuery = { __typename?: 'Query', myChatRooms?: Array<{ __typename?: 'Category', id: string, name: string, chatUsers?: Array<{ __typename?: 'User', id: string, username: string }> | null }> | null };

export type MyFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFriendsQuery = { __typename?: 'Query', myFriends?: Array<{ __typename?: 'User', id: string, username: string, online?: boolean | null }> | null };

export type MyPrivateMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPrivateMessagesQuery = { __typename?: 'Query', myPrivateMessages?: Array<{ __typename?: 'PrivateMessage', id: string, createdAt: string, body: string, sentBy: { __typename?: 'User', id: string, username: string }, sentTo: { __typename?: 'User', id: string, username: string } }> | null };

export type UserQueryVariables = Exact<{
  data: EditUserInput;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, email: any, about?: string | null, online?: boolean | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string, email: any, about?: string | null }> | null };

export type UpdateMetaQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
}>;


export type UpdateMetaQuery = { __typename?: 'Query', _allPostsMeta: { __typename?: '_QueryMeta', count?: number | null }, _categoryPostsMeta: { __typename?: '_QueryMeta', count?: number | null } };

export type CategoryChatSubSubscriptionVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type CategoryChatSubSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, content: string, sentBy: { __typename?: 'User', id: string, username: string }, category: { __typename?: 'Category', id: string, name: string } } };

export type NewUserSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUserSubscription = { __typename?: 'Subscription', newUser: { __typename?: 'User', id: string, username: string, email: any } };

export const CategoryDetailsFragmentDoc = gql`
    fragment CategoryDetails on Category {
  id
  createdAt
  updatedAt
  name
}
    `;
export const CommentDetailsFragmentDoc = gql`
    fragment CommentDetails on Comment {
  id
  createdAt
  updatedAt
  body
}
    `;
export const PostDetailsFragmentDoc = gql`
    fragment PostDetails on Post {
  id
  createdAt
  updatedAt
  title
  imageH
  imageW
  text
  image
  link
}
    `;
export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on User {
  id
  createdAt
  updatedAt
  username
  online
}
    `;
export const UserMeDetailsFragmentDoc = gql`
    fragment UserMeDetails on User {
  id
  username
  email
  about
  online
  avatar
}
    `;
export const CreateSubredditDocument = gql`
    mutation createSubreddit($data: CategoryInput!) {
  createCategory(data: $data) {
    category {
      ...CategoryDetails
    }
    errors {
      field
      message
    }
  }
}
    ${CategoryDetailsFragmentDoc}`;
export type CreateSubredditMutationFn = Apollo.MutationFunction<CreateSubredditMutation, CreateSubredditMutationVariables>;

/**
 * __useCreateSubredditMutation__
 *
 * To run a mutation, you first call `useCreateSubredditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubredditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubredditMutation, { data, loading, error }] = useCreateSubredditMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubredditMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubredditMutation, CreateSubredditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubredditMutation, CreateSubredditMutationVariables>(CreateSubredditDocument, options);
      }
export type CreateSubredditMutationHookResult = ReturnType<typeof useCreateSubredditMutation>;
export type CreateSubredditMutationResult = Apollo.MutationResult<CreateSubredditMutation>;
export type CreateSubredditMutationOptions = Apollo.BaseMutationOptions<CreateSubredditMutation, CreateSubredditMutationVariables>;
export const JoinChatRoomDocument = gql`
    mutation JoinChatRoom($data: CategoryInput!) {
  joinChatRoom(data: $data) {
    category {
      id
      name
      chatUsers {
        id
        username
      }
    }
  }
}
    `;
export type JoinChatRoomMutationFn = Apollo.MutationFunction<JoinChatRoomMutation, JoinChatRoomMutationVariables>;

/**
 * __useJoinChatRoomMutation__
 *
 * To run a mutation, you first call `useJoinChatRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChatRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChatRoomMutation, { data, loading, error }] = useJoinChatRoomMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinChatRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinChatRoomMutation, JoinChatRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinChatRoomMutation, JoinChatRoomMutationVariables>(JoinChatRoomDocument, options);
      }
export type JoinChatRoomMutationHookResult = ReturnType<typeof useJoinChatRoomMutation>;
export type JoinChatRoomMutationResult = Apollo.MutationResult<JoinChatRoomMutation>;
export type JoinChatRoomMutationOptions = Apollo.BaseMutationOptions<JoinChatRoomMutation, JoinChatRoomMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($data: CommentInput!) {
  createComment(data: $data) {
    comment {
      id
      body
      createdBy {
        id
        username
      }
      post {
        id
      }
    }
    post {
      id
      title
      totalComments {
        count
      }
      totalVotes {
        count
      }
      comments {
        id
        createdBy {
          username
        }
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($data: MessageInput!) {
  createMessage(data: $data)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($data: CreatePostInput!) {
  createPost(data: $data) {
    post {
      ...PostDetails
      comments {
        ...CommentDetails
        createdBy {
          ...UserDetails
        }
      }
      author {
        ...UserDetails
      }
      category {
        ...CategoryDetails
      }
      totalComments {
        count
      }
      totalVotes {
        score
        count
      }
    }
  }
}
    ${PostDetailsFragmentDoc}
${CommentDetailsFragmentDoc}
${UserDetailsFragmentDoc}
${CategoryDetailsFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID) {
  deletePost(postId: $postId) {
    post {
      id
    }
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($data: EditPostInput!) {
  editPost(data: $data) {
    post {
      ...PostDetails
      category {
        ...CategoryDetails
      }
    }
    errors {
      field
      message
    }
  }
}
    ${PostDetailsFragmentDoc}
${CategoryDetailsFragmentDoc}`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($data: AddUserInput!) {
  addFriend(data: $data) {
    me {
      id
      username
    }
    friend {
      id
      username
      online
    }
    errors {
      field
      message
    }
  }
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const EditUserDocument = gql`
    mutation editUser($data: EditUserInput!) {
  editUser(data: $data) {
    errors {
      field
      message
    }
    user {
      id
      username
      about
      email
      avatar
    }
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      id
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendPrivateMessageDocument = gql`
    mutation SendPrivateMessage($data: PrivateMessageInput!) {
  sendPrivateMessage(data: $data)
}
    `;
export type SendPrivateMessageMutationFn = Apollo.MutationFunction<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;

/**
 * __useSendPrivateMessageMutation__
 *
 * To run a mutation, you first call `useSendPrivateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPrivateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPrivateMessageMutation, { data, loading, error }] = useSendPrivateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendPrivateMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>(SendPrivateMessageDocument, options);
      }
export type SendPrivateMessageMutationHookResult = ReturnType<typeof useSendPrivateMessageMutation>;
export type SendPrivateMessageMutationResult = Apollo.MutationResult<SendPrivateMessageMutation>;
export type SendPrivateMessageMutationOptions = Apollo.BaseMutationOptions<SendPrivateMessageMutation, SendPrivateMessageMutationVariables>;
export const CreateVoteDocument = gql`
    mutation createVote($data: VoteInput!) {
  vote(data: $data) {
    vote {
      value
      id
    }
    post {
      id
      totalVotes {
        count
        score
      }
    }
  }
}
    `;
export type CreateVoteMutationFn = Apollo.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, options);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const CategoriesDocument = gql`
    query Categories($first: Int, $orderBy: String, $skip: Int, $name: String) {
  categories(first: $first, orderBy: $orderBy, skip: $skip, name: $name) {
    ...CategoryDetails
  }
}
    ${CategoryDetailsFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export function refetchCategoriesQuery(variables?: CategoriesQueryVariables) {
      return { query: CategoriesDocument, variables: variables }
    }
export const CategoryDocument = gql`
    query Category($categoryId: ID!) {
  category(categoryId: $categoryId) {
    id
    name
    chatUsers {
      id
      username
      online
    }
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export function refetchCategoryQuery(variables: CategoryQueryVariables) {
      return { query: CategoryDocument, variables: variables }
    }
export const CommentDocument = gql`
    query Comment($postId: ID) {
  comment(postId: $postId) {
    ...CommentDetails
    createdBy {
      ...UserDetails
    }
  }
}
    ${CommentDetailsFragmentDoc}
${UserDetailsFragmentDoc}`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentQuery(baseOptions?: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export function refetchCommentQuery(variables?: CommentQueryVariables) {
      return { query: CommentDocument, variables: variables }
    }
export const CommentsDocument = gql`
    query Comments($first: Int, $orderBy: String, $skip: Int, $postId: ID) {
  comments(first: $first, orderBy: $orderBy, skip: $skip, postId: $postId) {
    ...CommentDetails
    createdBy {
      ...UserDetails
    }
  }
}
    ${CommentDetailsFragmentDoc}
${UserDetailsFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export function refetchCommentsQuery(variables?: CommentsQueryVariables) {
      return { query: CommentsDocument, variables: variables }
    }
export const CommentsForPostDocument = gql`
    query CommentsForPost($postId: ID!, $orderBy: String) {
  post(postId: $postId, orderBy: $orderBy) {
    id
    comments {
      ...CommentDetails
      createdBy {
        ...UserDetails
      }
    }
  }
}
    ${CommentDetailsFragmentDoc}
${UserDetailsFragmentDoc}`;

/**
 * __useCommentsForPostQuery__
 *
 * To run a query within a React component, call `useCommentsForPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsForPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsForPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCommentsForPostQuery(baseOptions: Apollo.QueryHookOptions<CommentsForPostQuery, CommentsForPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsForPostQuery, CommentsForPostQueryVariables>(CommentsForPostDocument, options);
      }
export function useCommentsForPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsForPostQuery, CommentsForPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsForPostQuery, CommentsForPostQueryVariables>(CommentsForPostDocument, options);
        }
export type CommentsForPostQueryHookResult = ReturnType<typeof useCommentsForPostQuery>;
export type CommentsForPostLazyQueryHookResult = ReturnType<typeof useCommentsForPostLazyQuery>;
export type CommentsForPostQueryResult = Apollo.QueryResult<CommentsForPostQuery, CommentsForPostQueryVariables>;
export function refetchCommentsForPostQuery(variables: CommentsForPostQueryVariables) {
      return { query: CommentsForPostDocument, variables: variables }
    }
export const ChatRoomMessagesDocument = gql`
    query ChatRoomMessages($categoryId: ID!) {
  messages(categoryId: $categoryId) {
    id
    content
    sentBy {
      id
      username
    }
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useChatRoomMessagesQuery__
 *
 * To run a query within a React component, call `useChatRoomMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomMessagesQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useChatRoomMessagesQuery(baseOptions: Apollo.QueryHookOptions<ChatRoomMessagesQuery, ChatRoomMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatRoomMessagesQuery, ChatRoomMessagesQueryVariables>(ChatRoomMessagesDocument, options);
      }
export function useChatRoomMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatRoomMessagesQuery, ChatRoomMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatRoomMessagesQuery, ChatRoomMessagesQueryVariables>(ChatRoomMessagesDocument, options);
        }
export type ChatRoomMessagesQueryHookResult = ReturnType<typeof useChatRoomMessagesQuery>;
export type ChatRoomMessagesLazyQueryHookResult = ReturnType<typeof useChatRoomMessagesLazyQuery>;
export type ChatRoomMessagesQueryResult = Apollo.QueryResult<ChatRoomMessagesQuery, ChatRoomMessagesQueryVariables>;
export function refetchChatRoomMessagesQuery(variables: ChatRoomMessagesQueryVariables) {
      return { query: ChatRoomMessagesDocument, variables: variables }
    }
export const PostDocument = gql`
    query Post($postId: ID!) {
  post(postId: $postId) {
    ...PostDetails
    category {
      ...CategoryDetails
    }
    author {
      ...UserDetails
    }
    comments {
      ...CommentDetails
    }
    totalComments {
      count
    }
    totalVotes {
      score
      count
    }
  }
}
    ${PostDetailsFragmentDoc}
${CategoryDetailsFragmentDoc}
${UserDetailsFragmentDoc}
${CommentDetailsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export function refetchPostQuery(variables: PostQueryVariables) {
      return { query: PostDocument, variables: variables }
    }
export const PostsDocument = gql`
    query Posts($first: Int, $orderBy: String, $skip: Int, $category: String) {
  posts(first: $first, orderBy: $orderBy, skip: $skip, category: $category) {
    ...PostDetails
    category {
      ...CategoryDetails
    }
    author {
      ...UserDetails
    }
    comments {
      ...CommentDetails
    }
    totalComments {
      count
    }
    totalVotes {
      score
      count
    }
  }
  _allPostsMeta {
    count
  }
  _categoryPostsMeta(name: $category) {
    count
  }
}
    ${PostDetailsFragmentDoc}
${CategoryDetailsFragmentDoc}
${UserDetailsFragmentDoc}
${CommentDetailsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      category: // value for 'category'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export function refetchPostsQuery(variables?: PostsQueryVariables) {
      return { query: PostsDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    ...UserMeDetails
  }
}
    ${UserMeDetailsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }
export const MyChatRoomsDocument = gql`
    query MyChatRooms {
  myChatRooms {
    id
    name
    chatUsers {
      id
      username
    }
  }
}
    `;

/**
 * __useMyChatRoomsQuery__
 *
 * To run a query within a React component, call `useMyChatRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyChatRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyChatRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyChatRoomsQuery(baseOptions?: Apollo.QueryHookOptions<MyChatRoomsQuery, MyChatRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyChatRoomsQuery, MyChatRoomsQueryVariables>(MyChatRoomsDocument, options);
      }
export function useMyChatRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyChatRoomsQuery, MyChatRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyChatRoomsQuery, MyChatRoomsQueryVariables>(MyChatRoomsDocument, options);
        }
export type MyChatRoomsQueryHookResult = ReturnType<typeof useMyChatRoomsQuery>;
export type MyChatRoomsLazyQueryHookResult = ReturnType<typeof useMyChatRoomsLazyQuery>;
export type MyChatRoomsQueryResult = Apollo.QueryResult<MyChatRoomsQuery, MyChatRoomsQueryVariables>;
export function refetchMyChatRoomsQuery(variables?: MyChatRoomsQueryVariables) {
      return { query: MyChatRoomsDocument, variables: variables }
    }
export const MyFriendsDocument = gql`
    query MyFriends {
  myFriends {
    id
    username
    online
  }
}
    `;

/**
 * __useMyFriendsQuery__
 *
 * To run a query within a React component, call `useMyFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFriendsQuery(baseOptions?: Apollo.QueryHookOptions<MyFriendsQuery, MyFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFriendsQuery, MyFriendsQueryVariables>(MyFriendsDocument, options);
      }
export function useMyFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFriendsQuery, MyFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFriendsQuery, MyFriendsQueryVariables>(MyFriendsDocument, options);
        }
export type MyFriendsQueryHookResult = ReturnType<typeof useMyFriendsQuery>;
export type MyFriendsLazyQueryHookResult = ReturnType<typeof useMyFriendsLazyQuery>;
export type MyFriendsQueryResult = Apollo.QueryResult<MyFriendsQuery, MyFriendsQueryVariables>;
export function refetchMyFriendsQuery(variables?: MyFriendsQueryVariables) {
      return { query: MyFriendsDocument, variables: variables }
    }
export const MyPrivateMessagesDocument = gql`
    query MyPrivateMessages {
  myPrivateMessages {
    id
    createdAt
    body
    sentBy {
      id
      username
    }
    sentTo {
      id
      username
    }
  }
}
    `;

/**
 * __useMyPrivateMessagesQuery__
 *
 * To run a query within a React component, call `useMyPrivateMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPrivateMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPrivateMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPrivateMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MyPrivateMessagesQuery, MyPrivateMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPrivateMessagesQuery, MyPrivateMessagesQueryVariables>(MyPrivateMessagesDocument, options);
      }
export function useMyPrivateMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPrivateMessagesQuery, MyPrivateMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPrivateMessagesQuery, MyPrivateMessagesQueryVariables>(MyPrivateMessagesDocument, options);
        }
export type MyPrivateMessagesQueryHookResult = ReturnType<typeof useMyPrivateMessagesQuery>;
export type MyPrivateMessagesLazyQueryHookResult = ReturnType<typeof useMyPrivateMessagesLazyQuery>;
export type MyPrivateMessagesQueryResult = Apollo.QueryResult<MyPrivateMessagesQuery, MyPrivateMessagesQueryVariables>;
export function refetchMyPrivateMessagesQuery(variables?: MyPrivateMessagesQueryVariables) {
      return { query: MyPrivateMessagesDocument, variables: variables }
    }
export const UserDocument = gql`
    query User($data: EditUserInput!) {
  user(data: $data) {
    id
    username
    email
    about
    online
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export function refetchUserQuery(variables: UserQueryVariables) {
      return { query: UserDocument, variables: variables }
    }
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    email
    about
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export function refetchUsersQuery(variables?: UsersQueryVariables) {
      return { query: UsersDocument, variables: variables }
    }
export const UpdateMetaDocument = gql`
    query UpdateMeta($category: String) {
  _allPostsMeta {
    count
  }
  _categoryPostsMeta(name: $category) {
    count
  }
}
    `;

/**
 * __useUpdateMetaQuery__
 *
 * To run a query within a React component, call `useUpdateMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateMetaQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateMetaQuery(baseOptions?: Apollo.QueryHookOptions<UpdateMetaQuery, UpdateMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateMetaQuery, UpdateMetaQueryVariables>(UpdateMetaDocument, options);
      }
export function useUpdateMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateMetaQuery, UpdateMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateMetaQuery, UpdateMetaQueryVariables>(UpdateMetaDocument, options);
        }
export type UpdateMetaQueryHookResult = ReturnType<typeof useUpdateMetaQuery>;
export type UpdateMetaLazyQueryHookResult = ReturnType<typeof useUpdateMetaLazyQuery>;
export type UpdateMetaQueryResult = Apollo.QueryResult<UpdateMetaQuery, UpdateMetaQueryVariables>;
export function refetchUpdateMetaQuery(variables?: UpdateMetaQueryVariables) {
      return { query: UpdateMetaDocument, variables: variables }
    }
export const CategoryChatSubDocument = gql`
    subscription CategoryChatSub($categoryId: ID!) {
  newMessage(categoryId: $categoryId) {
    id
    content
    sentBy {
      id
      username
    }
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useCategoryChatSubSubscription__
 *
 * To run a query within a React component, call `useCategoryChatSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCategoryChatSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryChatSubSubscription({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryChatSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<CategoryChatSubSubscription, CategoryChatSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CategoryChatSubSubscription, CategoryChatSubSubscriptionVariables>(CategoryChatSubDocument, options);
      }
export type CategoryChatSubSubscriptionHookResult = ReturnType<typeof useCategoryChatSubSubscription>;
export type CategoryChatSubSubscriptionResult = Apollo.SubscriptionResult<CategoryChatSubSubscription>;
export const NewUserDocument = gql`
    subscription NewUser {
  newUser {
    id
    username
    email
  }
}
    `;

/**
 * __useNewUserSubscription__
 *
 * To run a query within a React component, call `useNewUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewUserSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewUserSubscription, NewUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewUserSubscription, NewUserSubscriptionVariables>(NewUserDocument, options);
      }
export type NewUserSubscriptionHookResult = ReturnType<typeof useNewUserSubscription>;
export type NewUserSubscriptionResult = Apollo.SubscriptionResult<NewUserSubscription>;