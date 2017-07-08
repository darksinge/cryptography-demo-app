
export class DiffieHellman {
    
    private generator: number;
    private prime: number;

    constructor(generator: number = 3, prime: number = 17) {
        this.generator = generator;
        this.prime = prime;
    }

    public fastModularExponentiation(a: number, b: number, n: number): number {
        a = a % n;
        var result = 1;
        var x = a;

        while(b > 0){
            var leastSignificantBit = b % 2;
            b = Math.floor(b / 2 | 0);

            if (leastSignificantBit == 1) {
                result = (result * x) % n;
            }

            x = x * x;
            x = x % n;
        }
        return result;
    };

    public decrypt(pubKey1: string, pubKey2: string) {
        // let pubKey1Segs = pubKey1.split(' ');
        // let pubKey2Segs = pubKey2.split(' ');

    }

    public keyExchange(secretA: number, secretB: number) {

        let publicKey_A = this.fastModularExponentiation(this.generator, secretA, this.prime);
        let publicKey_B = this.fastModularExponentiation(this.generator, secretB, this.prime);
        let privateKey_A = this.fastModularExponentiation(publicKey_B, secretA, this.prime);
        let privateKey_B = this.fastModularExponentiation(privateKey_A, secretB, this.prime);


        // console.log(`\nClientA`);
        console.log(`\nsecretA: ${secretA}, secretB: ${secretB}`);
        console.log(`${privateKey_A}, ${privateKey_B}\n`);
        // console.log(` secret: ${secretA}`);
        // console.log(` public: ${publicKey_A}`);
        // console.log(`private: ${privateKey_A}`);

        // console.log(`\nClientB`);
        // console.log(` secret: ${secretB}`);
        // console.log(` public: ${publicKey_B}`);
        // console.log(`private: ${privateKey_B}`);

        return {
            A: {
                secret: secretA,
                public: publicKey_A,
                private: privateKey_A
            },
            B: {
                secret: secretB,
                public: publicKey_B,
                private: privateKey_B
            }
        }
    }

    public key2Num(key: string, secretKey: string) {
        const keyNum = this.str2FlatNum(key);
        // console.log('secret2num = ' + secretKey2Num);
        return this.fastModularExponentiation(this.generator, keyNum, this.prime);
    }

    public str2FlatNum(s: string): number {
        return this.str2Nums(s).reduce((prev, curr) => {
            return prev + curr;
        });
    }

    public str2Ints(s: string): string {
        let codes = this.str2Nums(s);
        return codes.join(' ');
    }

    private str2Nums(s: string): number[] {
        return Array.from(s).map(val => {
            return val.charCodeAt(0);
        });
    }

    public genPublicKey(secretKey: string): string {
        const secretNums = this.str2Nums(secretKey);
        const modPowNums = secretNums.map(val => {
            return this.fastModularExponentiation(this.generator, val, this.prime);
        });
        // return this.fastModularExponentiation(this.generator, secretNum, this.prime);
        return modPowNums.join(' ');
    }

}