
Math.gcd = function(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    
    if (b > a) {
        var temp = a;
        a = b;
        b = temp; 
    }
    
    while (true) {
        a = a % b;
        if (a === 0) { 
            return b; 
        }
        b = b % a;
        if (b === 0) { 
            return a; 
        }
    }
};

Math.isPrime = function(n) {
    // Corner cases
    if (n <= 1)  return false;
    if (n <= 3)  return true;
 
    // This is checked so that we can skip
    // middle five numbers in below loop
    if (n%2 == 0 || n%3 == 0) return false;
 
    for (var i=5; i*i<=n; i=i+6)
        if (n%i == 0 || n%(i+2) == 0)
            return false;
 
    return true;
}

Math.modularExponentiaion = function(a, b, prime) {
    if (b <= 0) {
        return 1;
    } else if (b === 1) {
        return a % prime;
    } else if (b % 2 === 0) {
        return Math.modularExponentiaion((a * a) % prime, b / 2 | 0, prime) % prime;
    } else {
        return (Math.modularExponentiaion((a * a) % prime, b / 2 | 0, prime) * a) % prime;
    }
};

Math.nearestPrime = function(n) {
    if (n < 1) {
        return 0;
    }

    for (var i = 0; i < n; i++) {
        if (Math.isPrime(n - i))
            return n - i;
    }
}

Math.eulerTotient = function(n) {

    var result = n;
 
    // Consider all prime factors of n and for every prime
    // factor p, multiply result with (1 - 1/p)
    for (var p = 2; p * p <= n; ++p)
    {
        // Check if p is a prime factor.
        if (n % p == 0)
        {
            // If yes, then update n and result
            while (n % p == 0) {
                n /= p;
            }
            result *= (1.0 - (1.0 / p));
        }
    }
 
    // If n has a prime factor greater than sqrt(n)
    // (There can be at-most one such prime factor)
    if (n > 1)
        result *= (1.0 - (1.0 / n));
 
    return Math.floor(result);

};


// Utility function to store prime factors of a number
Math.findPrimeFactors = function(n) {
    var s = new Set();
    // Print the number of 2s that divide n
    while (n%2 == 0) {
        s.add(2);
        n = n/2;
    }
 
    // n must be odd at this point. So we can skip
    // one element (Note i = i +2)
    for (var i = 3; i <= Math.sqrt(n); i = i+2) {
        // While i divides n, print i and divide n
        while (n%i == 0)
        {
            s.add(i);
            n = n/i;
        }
    }
 
    // This condition is to handle the case when
    // n is a prime number greater than 2
    if (n > 2)
        s.add(n);
    return s;
}
    

Math.primitiveRoot = function(n) { 
    // Check if n is prime or not
    if (!Math.isPrime(n))
        return -1;
 
    // Find value of Euler Totient function of n
    // Since n is a prime number, the value of Euler
    // Totient function is n-1 as there are n-1
    // relatively prime numbers.
    var phi = n-1;
 
    // Find prime factors of phi and store in a set
    var s = Array.from(Math.findPrimeFactors(phi));
 
    // Check for every number from 2 to phi
    for (var r = 2; r <= phi; r++) {
        // Iterate through all prime factors of phi.
        // and check if we found a power with value 1
        var flag = false;
        for (var i = 0; i < s.length; i++) {
            var value = s[i];
            if (Math.modularExponentiaion(r, phi / value, n) === 1) {
                flag = true;
                break;
            }
        }

         // If there was no power with value 1.
        if (!flag)
            return r;
    }
 
    // If no primitive root found
    return -1;
}

module.exports.diffieHellman = function(prime, serverSecret, clientSecret) {
    prime = Math.nearestPrime(prime);
    const generator = Math.primitiveRoot(prime);
    const serverPublicKey = Math.modularExponentiaion(generator, serverSecret, prime);
    const clientPublicKey = Math.modularExponentiaion(generator, clientSecret, prime);
    const serverPrivateKey = Math.modularExponentiaion(clientPublicKey, serverSecret, prime);
    const clientPrivateKey = Math.modularExponentiaion(serverPublicKey, clientSecret, prime);

    // console.log(`Owner:\tPublic Key:\tPrivate Key:`);
    // console.log(`Server\t${serverPublicKey}\t\t${serverPrivateKey}`);
    // console.log(`Client\t${clientPublicKey}\t\t${clientPrivateKey}\n`);
}
