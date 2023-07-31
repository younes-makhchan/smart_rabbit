import style from "./Shutdown.module.css";

const Shutdown = () => {
  return (
    <section className={style.section} id="shutdown">
      <article className={style.article}>
        <div className={style.content}>
          <h2 className={style.title}>Smart Rabbit</h2>
          <p className={style.description}>
            Smart Rabbit innovative AI-powered tool understands children's
            questions, providing accurate and age-appropriate answers. With
            features such as:<br/><br/>
          </p>
          <ul className={style.description}>
            <li>Prompt Engineering</li>
            <li>Fast speech recognition,text to speech</li>
            <li>Image-to-text translation</li>
            <li>Generate pictures</li>
            <li>Multiple languages support,</li>
            <li>Support for mobile using PWA setup</li>
            <li>SEO</li>
            <li>Capacitor for Mobile Integration</li>
            <li>Responsive Web Design</li>
          </ul>
          <br></br>
          <a href="https://github.com/younes-makhchan/smart_rabbit" target="_blank">Link To Code Source</a>
        </div>
        <div className={style.img_wrapper}>
          <img
            src="icon-192x192.png"
            alt="smart rabbit reading a book"
            className={style.img}
          ></img>
        </div>
      </article>
    </section>
  );
};

export default Shutdown;
