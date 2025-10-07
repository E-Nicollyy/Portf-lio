from flask import Flask, render_template, request

app = Flask(__name__)

# Regra correta do jogo
regra_verdadeira = ["palindromos"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/verificar", methods=["POST"])
def verificar():
    palavra = request.form["palavra"]
    
    if palavra == palavra[::-1]:
        resultado = f"Sim! '{palavra}' pode ser colocada na caixa."
    else:
        resultado = f"Não! '{palavra}' não pode ser colocada na caixa."
    
    return render_template("resultado.html", palavra=palavra, resultado=resultado)

@app.route("/responder_regra", methods=["POST"])
def responder_regra():
    resposta = request.form["resposta"].lower().strip()
    
    if resposta in regra_verdadeira:
        mensagem = "Você acertou a regra!"
    else:
        mensagem = "Regra errada. Tente novamente!"
    
    return render_template("regra.html", mensagem=mensagem)

if __name__ == "__main__":
    app.run(debug=True)
