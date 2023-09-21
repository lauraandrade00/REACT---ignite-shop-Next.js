import { stripe } from '@/lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

export default function Product() {
  const { query } = useRouter()

  return(
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Bowl X</h1>
        <span>32,90</span>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est dolor corrupti tenetur repudiandae eveniet sequi quod cumque. Harum nam quod rem laudantium alias tempore molestiae repellat! Id ipsum sint inventore.</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }

  return {
    props: {},
    revalidate: 60 * 60 * 1, //1 hour
  }
}