'use client'

import {UploadDropzone} from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}
const FileUpload = ({endpoint, onChange, value}: FileUploadProps) => {
    return ( 
       <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res:any) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error:Error) => {
            console.log(">>> Upload error >>> ",error);
            
        }}
       />
     );
}
 
export default FileUpload;