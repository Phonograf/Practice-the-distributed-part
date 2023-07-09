let A = [
    [-1, 4, 1],
    [1, -2, 2],
    [-2, 8, 3],
];

let L = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
];

let U = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let N = A.length;
for (let i = 0; i < N; i++) {
    let n = N - i - 1;
    let u00 = U[i][i] = A[0][0];
    let u1T = []

    for (let j = 0; j < n; j++) {
        u1T[j] = U[i][j + i + 1] = A[0][j + 1];
    }
    let l1 = []
    for (let j = 0; j < n; j++) {
        l1[j] = L[j + i + 1][i] = A[j + 1][0] / u00;
    }
    let lu = new Array(n);
    for (let j = 0; j < n; j++) {
        lu[j] = new Array(n)
        for (let k = 0; k < n; k++) {
            lu[j][k] = A[j + 1][k + 1] - l1[j] * u1T[k];
        }
    }
    A = lu;
};
console.log(L);
console.log(U);