function sendFile(){
    const someExpressFiles = document.getElementById('someExpressFiles').files[0]
    let title= document.getElementById('title').value
    console.log(someExpressFiles)
    console.log(title)
    let fd = new FormData()
    fd.append('image',someExpressFiles)
    fd.append('text', title )
    if(someExpressFiles == undefined)
        alert('Não há imagem selecionada!')
    else{
        var options1 = {
            method:'POST',
            headers: {
                'Accept':'application/json'
            },
            body: fd
        }
        console.log(someExpressFiles)
        fetch('http://localhost:3000/foto',options1)
        .then(res => res.json())
        .then(data => alert(data.res))
        .catch((err) => {
            console.log('Request failed', err.message)
        });

    
    }
}