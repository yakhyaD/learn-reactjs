import {Request, Response } from 'express'

export interface newScream {
    body: string
    userHandler: string
    createdAt: string
    userImage?: string
    screamId?: string
    likeCount: number
    commentCount: number
}
export interface Scream {
    screamId: string
    body: string
    userHandler: string
    createdAt: string
    userImage: string
    likeCount: number
    commentCount: number
}
export interface newUser {
    email: string
    password: string
    confirmPassword: string
    handle: string
    imageUrl?: string
}
export interface User {
    email: string
    password: string
}
export interface Errors {
    email?: string
    password?: string
}
export interface UserRequest extends Request {
    user?: any
    rawBody?: any
}
export interface UserResponse extends Response {

}
export interface UserDetails  {
    bio?: string
    location?: string
    website?: string
}
export interface UserData {
    credentials: Credentials
    likes: Like[]
    notifications: Notification[]
}
export interface ScreamData {
    screamId: string
    handle: string
    createdAt: string
    body: string
    comments: Comment[]
}
export interface DataUser {
    user: Credentials
    screams: Scream[]
}
interface Comment  {
    userHandle: string
    body: string
    screamId: string
    createdAt: string
}
interface Like  {
    userHandle: string
    screamId: string
}
interface Credentials  {
    userId: string
    handle: string
    website: string
    createdAt: string
    imageUrl: string
    email: string
    bio: string
    location: string
}
interface Notification  {
    recipient: string
    sender: string
    createdAt: string
    screamId: string
    type: string
    read: Boolean
}
