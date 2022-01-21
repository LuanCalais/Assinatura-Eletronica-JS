window.onload = alteraResponsividade();

function alteraResponsividade() {
    let larguraJanela = window.innerWidth;
    let larguraTela = screen.width;

    // console.log('Largura Janela ' + larguraJanela);
    // console.log('Largura Tela ' + larguraTela);

    // Mobile Devices
    if (larguraTela <= 360 || larguraJanela <= 360) {
        console.log('A')
        $('#signature-pad').attr('width', '197');

    } else if (larguraTela >= 361 && larguraTela <= 500 || larguraJanela >= 361 && larguraJanela <= 500) {
        console.log('B');
        $('#signature-pad').attr('width', '320');

        // IPads e Tablets
    } else if (larguraTela >= 501 && larguraTela <= 768 || larguraJanela >= 501 && larguraJanela <= 768) {
        console.log('C')
        $('#signature-pad').attr('width', '470');

        // Small Screens, Laptops
    } else if (larguraTela >= 769 && larguraTela <= 1024 || larguraJanela >= 769 && larguraJanela <= 1024) {
        console.log('D')
        $("#signature-pad").attr('width', '470');

        // Desktops, Large Screens
    } else if (larguraTela >= 1025 && larguraTela <= 1200 || larguraJanela >= 1025 && larguraJanela <= 1200) {
        console.log('E')
        $("#signature-pad").attr('width', '760');

        // Estra Large Sreens, TV
    } else if (larguraTela >= 1201 || larguraJanela >= 1201) {
        console.log('F')
        $("#signature-pad").attr('width', '760');
    }

}