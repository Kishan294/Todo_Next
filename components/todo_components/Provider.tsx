"use client"

import { ReactNode } from "react"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface Props {
  children: ReactNode
  session?: Session
}

const Provider = ({ children, session }: Props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
)

export default Provider
