import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function requireAuth() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/api/auth/signin")
    }

    return session
}

export async function isAuthenticated() {
    const session = await getServerSession(authOptions)
    return !!session
}
