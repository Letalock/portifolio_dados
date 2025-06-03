const token = "sl.u.AFlRVltu0An7dg4zVO46TCjqySetMhy4YhdODbD5jdilU5pUt8NIB8H-4StKe3S2zk29s0NWCHSa-ByTmXKbesuybNjzDPV9vqBJYssuthBDIJTxPAK3BQStmXkkB7UWOqYpJnFEkjw1fuTNVkn7rI4DNrH5hg1JYpKrx8VFQN1qGZU1Zv_sr0m6HJWVVj6VgtNqhHOM0xjEbOf-459a0KsjVBfUwXct4we1BWfnRIlboruB_HhDMmBNW4PmFtiH45fsr-J4RX_u36UGLz7usCpZAjtkpSeLuOKWdpZ4fdLL2J9V2viKopBfK0fTfYXCHlfFfHZdosIc6YaBVUG52C5UMPKw6FzOsv6KQAOea7sSFCITj2zAH6J3sUQwPCmCrSpN5QExK7kYiMKtJApQZ1yVTZWfLmw_67w3PclQgsOryHxRsKZjT9mEALavBWoBEDW7LSoLYp26gxxhG73fDtKys64oX6BaAf6jsjca56-THrnsbzN1Jk3N3qyeXdlwwjdfYI-U6GLcqef4IJPFUPb2rtQvdg1BxFjhNsiyf96ZeXo6-BPyPbWWDOBPNnF7aRlP2xdKJQLOeJZW7mW1x2tNNUa0xoiKpt1ZV8h3GAVMefbKp1EQH3FTM6NyI396lgN_Cew3WDEvF9M4UmkvGEYdmdHbTl8l7-YPrY7lBDavWSmjGiblwuHTrcRH-ZdiiRf6QSFvRxCGzMXh7MgVMgSLkGJm2Mpahm-arUUjnPfVS2vSJJ0UvlnkLJCzc2C1Qyar1AMNMJrLsKG5OOBJcoh58_MX5i0iu-_OZNyaUdvfvGA8fK5EZiEJQPiloS_vV-D1CUjisH7M69eOMYiat1FuDFEV1v2rFig_VnBZyKdZx7IN8w-kQmtvessxFT1cPEIfmrTs5JO4LW7OV8ObAv2finwypbmNN2_pgqN3a5wf5CU2ZU7it0ZhuB75u_lQSjDx7UqgmT_r81wXkC1hb1kYak-OrJrSeA2s182mHJT6GJ1o9s3LahJNQAovRqmNRY2YVlIG-_2QbcqjAtl3bmtX8g28qqQHwl7sn6LWYApJuattYO4S6McEYpIAFsynmh3f8pz04rCep9z4Y8v74D6VYjLAHtVizjg6spkz0z5PFgL0CVKIaJKsWatb6pPa6l_VFMaES29DAC7yA52eXuGi3A-NzkE7OZQSZHj9UuF0dbELxoZ34EHoSiHZTzEB1oziwZQoxiXPNe_hjqTY5JzDkZEnpWuDyIT7bc957CZmqTpCelhw6p-2gFcsAOK1aVFsmNq8nRNK8euIKJ82vq8L"; // Substitua com seu token gerado

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Dropbox-API-Arg": JSON.stringify({
                path: `/certificados/${file.name}`, // Caminho para o arquivo no Dropbox
                mode: "add",
                autorename: true
            }),
        },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Arquivo carregado com sucesso:", data);
    } else {
        console.log("Erro ao carregar o arquivo:", response.statusText);
    }
};

// Exemplo de chamada com um arquivo
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
});
