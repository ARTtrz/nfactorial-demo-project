import About from "./about";
import Header from "./header";
import Main from "./main";
import styles from './lending.module.scss'
export default function LendingPage(){
    return (
        <div className={styles.container}>
            <Header/>
            <Main/>
            <About/>
        </div>
    )
}