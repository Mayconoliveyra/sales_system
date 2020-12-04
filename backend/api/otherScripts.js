module.exports = app => {
    function dataAtualFormatadaBR() {
        var data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = data.getFullYear(),
            hra = data.getHours().toString().padStart(2, '0'),
            mnt = data.getMinutes().toString().padStart(2, '0'),
            seg = data.getSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hra}:${mnt}:${seg}`

    }

    return { dataAtualFormatadaBR }
}