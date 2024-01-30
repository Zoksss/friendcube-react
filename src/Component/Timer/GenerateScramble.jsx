const generateScramble = (puzzle) => {
    let a, y, r, x;
    if(puzzle === "3x3"){
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 22; scrambele += (r + " '2"[0 | x(y = r) * 3] + ' '))
            for (; r == y; r = 'RLUDFB'[0 | x() * 6]);
        return scrambele;
    }
    else if(puzzle === "2x2"){
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 10; scrambele += (r + " '2"[0 | x(y = r) * 3] + ' '))
            for (; r == y; r = 'RUF'[0 | x() * 3]);
        return scrambele;
    }
    else if(puzzle === "pyra"){
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 9; scrambele += (r + " '"[0 | x(y = r) * 2] + ' '))
            for (; r == y; r = 'BRUL'[0 | x() * 4]);
        for(let i = 0; i < 4; i++){
            let l = Math.floor(Math.random() * 2);
            scrambele += (l==1?'brul'[i] + " '"[0 | Math.floor(Math.random() * 2)]:"");    
        }
        return scrambele;
    }
}

export default generateScramble;