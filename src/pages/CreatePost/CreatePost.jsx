import React from 'react'

import styles from './CreatePost.module.css'

import { useState } from 'react'

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>
        Escreva sobre o que quiser compartilhar e compartilhe o seu conhecimento.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Título:</span>
          <input type="text" name="title" id="title" required placeholder="Pense no título"
          onChange={(e) => setTitle(e.target.value)} 
          value={title}/>
        </label>
        <label htmlFor="">
          <span>URL da Imagem:</span>
          <input type="text" name="imagem" id="imagem" required 
          placeholder="Insira uma imagem"
          onChange={(e) => setImage(e.target.value)}
          value={image} />
        </label>
        <label htmlFor="">
          <span>Conteúdo:</span>
          <textarea name="body" id="body" required placeholder="Insira o conteúdo"
          onChange={(e) => setBody(e.target.value)} 
          value={body}/>
        </label>
        <label htmlFor="">
          <span>Tags:</span>
          <input type="text" name="tags" id="tags" required placeholder="Insira as tags separadas por vírgula e sem espaço"
          onChange={(e) => setTags(e.target.value)} 
          value={tags}/>
        </label>
        <button className='btn'>Cadastrar</button>
        {/* {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>} */}
      </form>
    </div>
  )

}

export default CreatePost