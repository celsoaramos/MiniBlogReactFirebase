import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <b>BLOG</b>
      </h2>
      <p>
        Esse projeto consiste em um blog feito com React no front e Firebase no back.
      </p>
      <Link to="posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  )
}

export default About