import Link from "next/link";
import LogoImage from '../.././public/patrol.png'
import Image from "next/image";
import { useRouter } from "next/router";
export default function Header(){
    const router = useRouter()
    
    return (
        <>
            <div className="flex justify-between items-center px-5 sm:px-2 pt-5 pb-3 max-w-[1600px] m-auto sm:w-full ">
                <div className="">
                    <Link href="/">
                        <Image
                            src={LogoImage}
                            className="sm:w-28"
                            alt="logo"
                            width={160}
                            height={160}
                        />
                    </Link>
                    {/* <span className="text-lg text-gray-800 font-medium">
                        BETA
                    </span> */}
                </div>
                <nav>
                    <ul className="flex items-center justify-between gap-10 sm:gap-2  uppercase font-medium text-lg sm:text-sm xs:text-xs">

                        <li className="relative inline-block group">
                            
                            <Link href="#" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                О проекте
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        {/* <li className="relative inline-block group">
                            
                            <Link href="/test" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Автошколы
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li> */}
                        <li className="relative inline-block group">
                            
                            <Link href="/news" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Новости
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="relative inline-block group">
                            
                            <Link href="/chatbot" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Чатбот
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                        <li className="relative inline-block group">
                            
                            <Link href="/donation" className="hover:text-blue-500 transition-all ease-in-out duration-300">
                                Донаты 
                            </Link>
                            
                            <div className="absolute bottom-0 left-0 w-full h-0.5  bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                        </li>
                    </ul>
                </nav>
        </div>
        </>
    )
}