# Barrel Format

Barrels are terminated with the terminator byte `0xFF`. In instances where `0xFF` appears in the original binary data
object, this byte is preceded by the escape byte `0xFE`. Similarly, `0xFE` is preceded by the escape byte `0xFE`
wherever it appears in the original binary data object.

## Example

The following binary data objects will be converted to and from the barrel format as an example:

1. `0x 01 23 45 67 89 AB CD EF`
2. `0x FF FE FF`
3. `0x` (empty, zero bytes)
4. `0x FE ED BE EF`

### Binary data objects to barrels

First, use `0xFE` to escape each instance of `0xFF` and `0xFE` in each binary data object.

1. `0x 01 23 45 67 89 AB CD EF`
2. `0x FE FF FE FE FE FF`
3. `0x` (empty, zero bytes)
4. `0x FE FE ED BE EF`

Next, append the terminator `0xFF` to the end of each binary data object to create barrels.

1. `0x 01 23 45 67 89 AB CD EF FF`
2. `0x FE FF FE FE FE FF FF`
3. `0x FF`
4. `0x FE FE ED BE EF FF`

Finally, concatenate the barrels into a single byte array.

* `0x 01 23 45 67 89 AB CD EF FF FE FF FE FE FE FF FF FF FE FE ED BE EF FF`

### Barrels to binary data objects

First, iterate through each byte in the byte array searching for instances of the terminator `0xFF`. When the escape byte
`0xFE` is encountered, skip the following byte. The interestings bytes in the byte array below have been marked with `T`
for "terminator byte", `E` for "escape byte", and `S` for "skipped byte".

```
0x 01 23 45 67 89 AB CD EF FF FE FF FE FE FE FF FF FF FE FE ED BE EF FF
                           T  E  S  E  S  E  S  T  T  E  S           T
```

Next, split the byte array at each terminator.

1. `0x 01 23 45 67 89 AB CD EF FF`
2. `0x FE FF FE FE FE FF FF`
3. `0x FF`
4. `0x FE FE ED BE EF FF`

Remove the `0xFF` terminator at the end of each barrel.

1. `0x 01 23 45 67 89 AB CD EF`
2. `0x FE FF FE FE FE FF`
3. `0x` (empty, zero bytes)
4. `0x FE FE ED BE EF`

Finally, iterate through each byte to remove escape bytes which are not preceded by escape bytes. This will yield the
original binary data objects.

1. `0x 01 23 45 67 89 AB CD EF`
2. `0x FF FE FF`
3. `0x` (empty, zero bytes)
4. `0x FE ED BE EF`
