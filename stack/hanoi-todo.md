# Algoritmo Torre de Hanoi

- recebe a quantidade de pratos
- monta as torres de origem, suporte e destino
- joga os pratos na torre origem
- chama a função


## função torre de hanoi

- recebe os parâmetros pratos, t origem, t ajuda, t destino, nome t origem, nome t ajuda, nome t destino, movimentos = []
- se não tem pratos
	- então retorna os movimentos
- se tem 1 prato
	- então joga o prato da torre de origem na torre destino
	- cria um objeto movimento que guarda os movimentos realizados
	- cada propriedade do objeto [nome t] recebe o valor de cada torre.
	- poe o movimento dentro do array de movimentos
- senão
	- chama a recursão passando o prato -1, t origem, t destino, t helper, nome t origem, nome t destino, nome t helper e movimentos.
	- joga o prato da torre de origem na torre destino
	- cria um objeto movimento que guarda os movimentos realizados
	- cada propriedade do objeto [nome t] recebe o valor de cada torre.
	- poe o movimento dentro do array de movimentos
	- chama a função recursivamente passando o prato - 1 , t helper, t origem, t destino, nome t helper, nome t origem, nome t destino e movimentos	
- retorna array de movimentos