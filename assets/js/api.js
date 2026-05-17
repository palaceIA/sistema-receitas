const express = require('express')
const cors = require('cors')

const { createClient } = require('@supabase/supabase-js')

const app = express()

app.use(cors())

app.use(express.json())

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(
  supabaseUrl,
  supabaseKey
)


app.get('/receitas', async (req, res) => {

  const { data, error } = await supabase
    .from('receitas')
    .select('*')


  if (error) {

    return res.status(500).json(error)
  }

  res.json(data)
})


app.post('/receitas', async (req, res) => {

  const {
    nome,
    ingredientes,
    modo_preparo,
    tempo_preparo
  } = req.body


  const { data, error } = await supabase
    .from('receitas')
    .insert([
      {
        nome,
        ingredientes,
        modo_preparo,
        tempo_preparo
      }
    ])
    .select()


  if (error) {

    return res.status(500).json(error)
  }

  res.status(201).json(data)
})


app.put('/receitas/:id', async (req, res) => {

  const { id } = req.params

  const {
    nome,
    ingredientes,
    modo_preparo,
    tempo_preparo
  } = req.body


  const { data, error } = await supabase
    .from('receitas')
    .update({
      nome,
      ingredientes,
      modo_preparo,
      tempo_preparo
    })
    .eq('id', id)
    .select()


  if (error) {

    return res.status(500).json(error)
  }

  res.json(data)
})


app.delete('/receitas/:id', async (req, res) => {

  const { id } = req.params


  const { error } = await supabase
    .from('receitas')
    .delete()
    .eq('id', id)


  if (error) {

    return res.status(500).json(error)
  }

  res.json({
    mensagem: 'Receita removida com sucesso'
  })
})


app.listen(3000, () => {

  console.log('Servidor rodando em http://localhost:3000')
})

