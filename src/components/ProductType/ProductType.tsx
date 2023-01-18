interface ProductTypeProps {
  productType: string
}

export default function ProductType({ productType }: ProductTypeProps) {
  return <div>{productType}</div>
}
