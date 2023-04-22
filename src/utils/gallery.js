import supabase from "../supabase.config";
import axios from "axios";

axios.defaults.withCredentials = true;

const uploadGallery = async (images, eventId) => {
  try{ 
    let imageNames = []
    for(let i= 0 ; i<images.length ;i++){

        imageNames.push(images[i].name)    
        const { data, error } = await supabase.storage
        .from("events")
        .upload(`${eventId}/gallery/${images[i].name}`, images[i], {
          upsert: true,
        });
        console.log(data)
        if (error) {
          console.log(error);
        } else {
          console.log("data is" ,data);
        }
}
    const urls = await axios.post(`${process.env.REACT_APP_API_URL}/cms/events/upload-gallery/${eventId}`,{images: imageNames})
    console.log("urls " ,urls)
    return urls;
  }
    catch(err){
        console.log(err)
    }

};


export default uploadGallery;