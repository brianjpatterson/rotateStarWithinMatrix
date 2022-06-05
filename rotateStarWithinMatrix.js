function solution(matrix, width, center, t) {
    
    const getSubmatrix = (matrix, coords, width) => {
          let tmp, submatrix = matrix.slice(coords[0], coords[0]+width)
        const retern = [];
        
        for (let i=0;i<submatrix.length;i++) {
               tmp = submatrix[i].slice(coords[1], coords[1]+width)
               retern.push(tmp)
        }
        return retern
    }
    
    const replaceSubmatrix = (matrix, submatrix, coords) => {
        
        const x = coords[0],
              y = coords[1],
              width = submatrix.length,
              retern = []
          let tmp, tmp1
    
        if (x > 0) 
            for(let i=0;i<x;i++) 
                retern.push(matrix[i])  
        
        for (let i=x;i<width+x;i++) {
            tmp = y > 0 ? matrix[i].slice(0,y) : []
            tmp1 = y + width - 1 < matrix[i].length ? 
                matrix[i].slice(y + width) : []
            tmp = [...tmp,...submatrix[i-x],...tmp1]
            retern.push(tmp)     
        }
        
        if (retern.length < matrix.length)
            for (let i=x+width;i<matrix.length;i++)
                retern.push(matrix[i])
                   
        return retern
    }
    
   const rotateStar = matrix => {
     
          const center = (matrix[0].length - 1) / 2
       
          for (let i=1;i<center+1;i++) {
                tmp = matrix[center-i][center-i]
                matrix[center-i][center-i] = matrix[center][center-i]
                matrix[center][center-i] = matrix[center+i][center-i]
                matrix[center+i][center-i] = matrix[center+i][center]
                matrix[center+i][center] = matrix[center+i][center+i]
                matrix[center+i][center+i] = matrix[center][center+i]
                matrix[center][center+i] = matrix[center-i][center+i]
                matrix[center-i][center+i] = matrix[center-i][center]
                matrix[center-i][center] = tmp
                   
          }
        return matrix
    }
    
    const start = [center[0]-((width-1)/2),center[1]-((width-1)/2)]
    const rotate = t % 8
      let submatrix = start === [0,0] ? matrix : getSubmatrix(matrix, start, width)
    for (i of [...Array(rotate).keys()])
        submatrix = rotateStar(submatrix)
    
    return replaceSubmatrix(matrix, submatrix, start)
}
