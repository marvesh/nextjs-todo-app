
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jeexudblsnuntkioutji.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
console.log('i am the supabase key', supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey)
