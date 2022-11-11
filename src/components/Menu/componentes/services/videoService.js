import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://pdoijezyyhbgodotsdqv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkb2lqZXp5eWhiZ29kb3RzZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzk5MTgsImV4cCI6MTk4Mzc1NTkxOH0.UxoD3MVGe5UtOpEnNBNkAFYuCX4xGqjm3hbU0QYwaS8"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                            .select("*")
                            
        }
    }
}