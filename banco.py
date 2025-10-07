#Usuario digitar o nome
nome = str(input('Digite o seu nome: '))

#Usuario digitar o CPF 
cpf = str(input("Digite o seu CPF: "))

#saldo começa com zero 
saldo = 0 

while True:

    #Menu para o usuario escolher o tipo de serviço
    menu = int(input("\n Digite um número para o que deseja Realizar\n 1-Deposito\n 2-Consultar Saldo\n 3-Retirada\n 4-Encerrar Programa\n: "))

    #Condição para a primeira condição - deposito
    if menu == 1:
        consulta = int(input("Qual valor deseja depositar: "))
        #atualiza o saldo a cada vez que o usuario digitar(escolhendo a opcao 1)
        saldo += consulta 
        print(f'Valor {consulta} depositado com sucesso')

    #condiçao para a segunda condição - Consultar Saldo
    elif menu == 2:
        print(f'Saldo Atual:{saldo:.2f}')

    #condiçao para a terceira condição - Retirada
    #se o saldo for menor ou igual o saldo total o usuario pode digitar, se nao, else roda
    #atualiza a retirada de acordo com o ultimo saldo do usuario

    elif menu == 3:
        consulta = int(input("Qual valor deseja retirar: "))
        if consulta <= saldo:
            saldo -= consulta 
            print(f'Valor de {consulta} foi retirado com sucesso.')
        else:
            print("valor insuficiente")

    #condiçao para a quarta condição - Encerrar o programa
    elif menu == 4:
        print('Encerrado')
        break


