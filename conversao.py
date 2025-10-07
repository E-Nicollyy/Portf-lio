print('===================CONVERSÃO PARA REAIS================================')
while True:

    menu = int(input("\n Escolha o que deseja converter em Reais: \n 1-Dolar\n 2-Euro\n 3-Libras\n 4-Ienes\n 5- Sair\n:"))
    escolha = int(input("Digite o número que deseja converter para o real: "))

    dolar = escolha*5.84
    euro = escolha*6.39
    libra = escolha*7.53 
    ienes = escolha*0.039 

   
    if menu == 1:
        print(f'{escolha}  dolar (USD) equivale a R${dolar:.2f} de reais')
    elif menu == 2:
        print(f'{escolha} euro (EUR) equivale a R${euro:.2f} de reais')
    elif menu == 3:
        print(f'{escolha} libra (GPB) equivale a R${libra:.2f} de reais')
    elif menu == 4:
        print(f'{escolha}  ienes (JPY) equivale a R${ienes:.2f} de reais')
    else:
        print('ERRO')