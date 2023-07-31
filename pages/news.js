import NewsCard from '../components/NewsCard/NewsCard'
import data from '../news.json'
import { useRouter } from 'next/router'
import Header from './lending/header'
export default function NewsPage() {

    const router = useRouter()
    const dataPerPage = 10
    
    let currentPage = 1
    let totalPages = 10

    if(Number(router.query.page) >= 1){
        currentPage = Number(router.query.page)
    }
    
    let offset = (currentPage - 1 ) * dataPerPage
    let pageNumbers = []

    for (let i = currentPage - 3; i<=currentPage+3; i++){
        if(i<1) continue
        if(i>totalPages) break
        debugger;
        pageNumbers.push(i)

    }

    return(
        <>
            <section>
                <div className="max-w-[1550px] m-auto">
                    <Header/>
                    {/* <h1 className="text-4xl px-4 pt-4 font-medium">Новости</h1> */}
                    <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            data.map((curElem) => {
                                return <NewsCard key={curElem.publish_date} link={curElem.link} title={curElem.title} imageUrl={curElem.image_url} date={curElem.publish_date}/>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}