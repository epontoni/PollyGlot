# PollyGlot

## Core Requirements

- Build it from scratch
- Follow the design
- Make shure you:
  - Setup the IpenAI API
  - Select a model
  - Engineer a prompt
  - Use temperature
  - Use max_tokens
  - Render the completion
- Use any framework or library.

## Stretch Goals

- Turn into chat app
- Add functionality:
  - Ability to correct
  - Add AI genrated images
- Habdke errirs+.
- Deploy (with API key hidden)

## Some configurations to run the examples

Create a nodejs package:

```
npm init -y
```

Add the following configurations:

```
"type": "module",
```

y dentro de `"scripts": { ... }`

```
"scripts": {
  "dev": "node --env-file .env index.js",
}
```

Crear el archivo `.env` con la variable de entorno `OPENAI_API_KEY`.
Puede ejecutar el archivo `index.js` con el comando

```
npm run dev
```
