class CaixaDaLanchonete {

    constructor(){
        this.cardapio = {'cafe': 3, 'chantily': 1.5, 'suco': 6.20, 'sanduiche': 6.50, 'queijo': 2.0, 'salgado': 7.25, 'combo1': 9.5, 'combo2': 7.5};

        this.pagamento = {'dinheiro': 0.95, 'debito': 1.00, 'credito': 1.03};
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if(itens.length == 0) return "Não há itens no carrinho de compra!";

        if(!(metodoDePagamento in this.pagamento)) return "Forma de pagamento inválida!";
        
        if(this.verificarItens(itens)) return "Item inválido!";

        if(this.verificarExtra(itens)) return "Item extra não pode ser pedido sem o principal";

        var valorTotal = 0;
        itens.forEach( (item) => {

            const [produto, quantidade] = item.split(',');
            const precoUnitario = this.cardapio[produto];

            if (precoUnitario !== undefined) {
                valorTotal += precoUnitario * parseInt(quantidade);
            }

        });
            
        if(valorTotal == 0){
            return "Quantidade inválida!";
        }

        valorTotal = valorTotal * this.pagamento[metodoDePagamento];
        valorTotal = valorTotal.toFixed(2).toString();
        valorTotal = valorTotal.replace('.', ',');

        let retorno = `R$ ${valorTotal}`;

        return retorno;
    }

    verificarExtra(itens){

        if(itens.some(item => item.includes('chantily'))){
            if(itens.some(item => item.includes('cafe'))){
                return false
            }else{
                return true
            }
        }
        
        if(itens.some(item => item.includes('queijo'))){
            if(itens.some(item => item.includes('sanduiche'))){
                return false
            }else{
                return true
            }
        }
        
        return false
    }

    verificarItens(itens){

        const contemItem = itens.every(item => {
            const [itemName] = item.split(',');
            return itemName in this.cardapio;
          });

        if(contemItem) return false;
        
        return true;

    }

}


export { CaixaDaLanchonete };

