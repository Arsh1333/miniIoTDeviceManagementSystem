export function decodeLittleEndian(intVal) {
  const buf = Buffer.allocUnsafe(4);
  buf.writeUInt32LE(intVal, 0);
  return buf.readFloatLE(0);
}
