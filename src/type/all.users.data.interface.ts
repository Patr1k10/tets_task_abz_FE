import {UserInterface} from "@/type/user.interface";

export interface AllUsersDataInterface{
  "success": true,
  "page": number
  "total_pages": number
  "total_users": number
  "count": number
  "links": {
  "next_url": string,
    "prev_url": string | null
},
  "users": UserInterface[]
}