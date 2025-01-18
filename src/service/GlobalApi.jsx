import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': 'AIzaSyBiTKAfxeeuG4gGIomh4faIvpTEGhl5m1M',
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id',

        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBiTKAfxeeuG4gGIomh4faIvpTEGhl5m1M'