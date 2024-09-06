import os
from openai import OpenAI

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
       {"role": "user", "content": "generame una pregunta aleatoria con 4 respuestas en donde 1 de las opciones sea la correcta y las 3 restantes incorrectas, solo márcame con una X entre paréntesis al final la respuesta correcta."}    ]
)

print(completion.choices[0].message)