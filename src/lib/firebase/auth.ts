import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

function requireAuth() {
  if (!auth) throw new Error('Firebase chưa được cấu hình — xem docs/FIREBASE_SETUP.md')
  return auth
}

export async function registerWithEmail(name: string, email: string, password: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(requireAuth(), email, password)
  await updateProfile(user, { displayName: name })
  return user
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(requireAuth(), email, password)
  return user
}

export async function logout(): Promise<void> {
  await firebaseSignOut(requireAuth())
}
