

$("#adc_pedido").submit(function(event){
    alert("Informações adicionadas com sucesso!");
})

$("#update_pedido").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/pedidos/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Informações atualizadas com sucesso!");
    })

})

if(window.location.pathname == "/pedidos"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/pedidos/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Você quer mesmo excluir este pedido?")){
            $.ajax(request).done(function(response){
                alert("Pedido excluído com sucesso!");
                location.reload();
            })
        }

    })
}