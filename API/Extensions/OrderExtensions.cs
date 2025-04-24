using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Extensions;
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(i=> new OrderDTO
            {
                Id=i.Id,
                OrderDate=i.OrderDate,
                FirstName=i.FirstName,
                LastName=i.LastName,
                Phone=i.Phone,
                Address=i.Address,
                City=i.City,
                CustomerId=i.CustomerId,
                OrderStatus=i.OrderStatus,
                DeliveryFee=i.DeliveryFee,
                SubTotal=i.SubTotal,
                OrderItems=i.OrderItems.Select(item=> new OrderItemDTO{
                    Id=item.Id,
                    ProductId=item.ProductId,
                    ProductName=item.ProductName,
                    Price=item.Price,
                    Quantity=item.Quantity,
                    ProductImage=item.ProductImage
                }).ToList()
            });
        }

    }
