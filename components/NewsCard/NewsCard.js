import Image from "next/image";
import Link from "next/link";
export default function NewsCard({imageUrl, link, title, date}){
    function checkFileExtension(imageUrl) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv'];
      
        const lowerCaseUrl = imageUrl.toLowerCase();
      
        for (const ext of imageExtensions) {
          if (lowerCaseUrl.endsWith(ext)) {
            return 'image';
          }
        }
      
        for (const ext of videoExtensions) {
          if (lowerCaseUrl.endsWith(ext)) {
            return 'video';
          }
        }
      
        // If the URL doesn't end with any known image or video extension, return null or any default value indicating neither image nor video.
        return null;
    }
    let url = 'https://www.zakon.kz' + link
    return (
        <div className="bg-gray-100 p-4  rounded shadow-md flex flex-col justify-between ">
          <Link href={url}>
          <div className="flex flex-col gap-3">
          {
                  checkFileExtension(imageUrl) === 'image' ? (
                    <Image src={imageUrl} width={420}  height={100} alt="thumb" />
                  ) : (
                    <>
                      <video playsInline="playsinline" x-webkit-airplay="allow"
                      preload="metadata" loop="loop" tn-video="false">
                        <source src={imageUrl} />
                      </video>
                    </>
                  )
                  
                  
            }
            <span>
                {title}
            </span>
          </div>

          <div className="flex flex-col gap-3 text-left">

              <div>
                  {date}
              </div>
          </div>
          </Link>
        </div>
    )
}