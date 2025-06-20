import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

function ProductBreadcrumbs({ product }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      sx={{ mb: 3 }}
    >
      <Link underline='hover' color='inherit' href='/'>
        Trang chủ
      </Link>
      <Link
        underline='hover'
        color='inherit'
        href={`/category/${product.category}`}
      >
        {product.category}
      </Link>
      <Typography color='text.primary'>{product.name}</Typography>
    </Breadcrumbs>
  )
}

export default ProductBreadcrumbs
