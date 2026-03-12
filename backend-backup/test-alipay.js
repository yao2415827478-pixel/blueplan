/**
 * 测试支付宝私钥格式
 */

const crypto = require('crypto');

// 你的私钥（从.env获取）
const privateKey = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPwujDmGR6kan5ywxkC5lUoMBIxQ9XIXXN/QXnmH/17N5XCZqlIEqoAT+ixYFqfiqYKfjJxsfdRG6+nS7HDkwUiHm9sZqwK3nzL/8icNFYCliIe5/f/fFmnj11QcEVP1iH7N6jyUWucwDqmu/muwQqmkCzizmVBskA2lUBwIZaXbN7nRq1eWcX5uqWohsvnDfK0+UC01a5Jjal5ZsfSi6xLh3Id4XQ6rOUSNx24FsEWfTRNf7FTMdqsL+RtnAIYxP/h0fypFZk5dXoZHcOHZJsY2gcRZuB5YkQ2pMXg5cVs2xdlyW4mRZBNU2/RUXm76zfpAwyj2LpHhtEMiTmCDJTAgMBAAECggEAG0Ffsd2NhzNgn2wgkEMmscW8Ts+VhfZhCEmlOfBOqkhbKvM2L4I8xTdfYjPBwnfjCXBDq7WVJN0Zhef0+2Y5hFcPhahLZIUJnNKHs3biKafkexO9DtFtWAA+NKHfwnB9D2AYIcNCA73n+ZKgUwU31//grmmB5EAiEZhTL37Zuf3q9Pq9NZFAxte0E0MlqSWqVO0IE4egLkUCV4k0hr01ucpbIoeKrsZ0Rc1hhTOx1Y98JJ31jqa/b0C+1s3o/ZytyRGpIn86nOFFqhC1FNGG5xoCbYcno9P6AickU/V1tYHa/I24PktSj045+BoG+DaZw918DB4sirtXj+gvVyZaSQKBgQDKgogUTNuIlgFuA9p2vKBvwgk3A9aXhdPJkL/U7pZzp4bMWCVToITUygzfexJfsQeMatn4dOZ+8y2bAMTQbji0QAxm4+2fSUpiryiHeFgjbQmG5ht7I6vElL/0M0FYkkkFTPOpsTae6StzKtrWDoEv2gLrbfGW3VMTi8nx+9FnrwKBgQC1u+ACDhMok1E0PBiIphgpzpQ5aMB3dfiFGF79OUINBP7YBiL9INGbCjx/JTFfdC2YYjIH6JebO0jAEizH2dZn9BJk2whIYblF3jhjl9w6GFMR0zbGCsn0fRG7CLtG1n+X8u8qcC8AWFTTIpSxhlsJ+3y+ah7oBxkMzebdZykknQKBgQCpIbGjOrmTbq0NBBzeVBWuoSDvGL6N2FCUpNcCcK2pND5pxiiOmp611XZA49npn8HNLaSUVJX5awIo1dCKv7OOH3v8Jtrb0OtWVjIESqdaFwQA7YgAJT+dNBrJSlGGNs7TpXxPulkDCXyneCBC7ORKYctUc4N1W625wmNMPeObswKBgQCDULTlZzwqtoAXqVDk9HdDRjTOYsWnzEN+EIUanlP+ylxGxfBkTWGHkNbz3HEXkwAbOuEB2+woS6ceukNHST1msfLUk3whqRNRy+ec9y83fzoPCDps0YDqO7EjH4ULA5UAu5ZbaOJdcnYgdb1RpU6FIQYbJN0eNXrBSMqHsrIE9QKBgEIgWGRUh42AkD7lmkvEUlthK5CbCdpuL5sDUBpGegXiKbmoB6ZtdAug6hPdA9d1GVXp/CjVBkHGyD2yL+bLZ1UPoUysN8ifR857wDyebe0zAq/dbvw/jKfRiFgejLH++NTrJzhbFqv0swFLgCpzfXDZ/GsePL84oNg5ekaFp+5f`;

console.log('=== 支付宝私钥格式测试 ===');
console.log('私钥长度:', privateKey.length);
console.log('私钥开头:', privateKey.substring(0, 50));
console.log('私钥结尾:', privateKey.substring(privateKey.length - 50));

// 检查私钥格式
try {
  // 尝试解析为PKCS#8
  const keyObj = crypto.createPrivateKey({
    key: privateKey,
    format: 'pem',
    type: 'pkcs8'
  });
  console.log('✅ 私钥格式: PKCS#8 (正确格式)');
  console.log('密钥算法:', keyObj.asymmetricKeyType);
  console.log('密钥大小:', keyObj.asymmetricKeySize);
} catch (error1) {
  console.log('❌ 不是PKCS#8格式:', error1.message);
  
  try {
    // 尝试解析为PKCS#1
    const keyObj = crypto.createPrivateKey({
      key: privateKey,
      format: 'pem',
      type: 'pkcs1'
    });
    console.log('⚠️ 私钥格式: PKCS#1 (需要转换为PKCS#8)');
    console.log('密钥算法:', keyObj.asymmetricKeyType);
    console.log('密钥大小:', keyObj.asymmetricKeySize);
    
    // 转换为PKCS#8
    const pkcs8Key = keyObj.export({
      format: 'pem',
      type: 'pkcs8'
    });
    console.log('\n✅ PKCS#8格式私钥:');
    console.log(pkcs8Key);
    
  } catch (error2) {
    console.log('❌ 也不是PKCS#1格式:', error2.message);
  }
}

// 测试签名
console.log('\n=== 签名测试 ===');
try {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update('test');
  sign.end();
  
  const signature = sign.sign(privateKey, 'base64');
  console.log('✅ 签名成功，签名长度:', signature.length);
} catch (error) {
  console.log('❌ 签名失败:', error.message);
}