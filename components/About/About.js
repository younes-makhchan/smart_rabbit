
import style from "./About.module.css"



const About=()=>{
    return (
        <section className={style.section} id="about">
                <article className={style.article} >
                <div className={style.content}>
                <h2 className={style.title}>About Smart Rabbit</h2>
                <p className={style.description}>
                Smart Rabbit is the ultimate solution for parents seeking a fun and engaging way to educate and entertain their kids. This innovative AI-powered tool understands children's questions, providing accurate and age-appropriate answers that help them learn and grow. With features such as speech recognition and image-to-text translation, Smart Rabbit covers all children's needs, ensuring they have access to the resources and advice they need to succeed. Available in multiple languages, Smart Rabbit is the go-to tool for parents worldwide looking to provide their children with a rich and interactive learning experience.

                </p>
                </div>
                <div className={style.img_wrapper}>
                    <img src="icon-192x192.png" alt="smart rabbit reading a book" className={style.img}></img>
                </div>
                </article>
        </section>
    )
}

export default About;