using System;
using AutoMapperProfile = AutoMapper.Profile;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core;


namespace Checkout.Movie.Profiles.Infra
{
  public class EntitiesMappingProfile : AutoMapperProfile
  {
    public EntitiesMappingProfile()
    {
      CreateMap<ProfileSharingToken, ProfileSharingTokenData>()
        .ForMember(_ => _.IsAccessGranted, _ => _.MapFrom(o => o.GrantedAccessAt <= DateTimeOffset.UtcNow))
        .ForMember(_ => _.IsRequestedAuthorization,
          o => o.MapFrom(_ => _.RequestedAuthorizationAt <= DateTimeOffset.UtcNow))
        .ReverseMap()
        .IgnoreAllPropertiesWithAnInaccessibleSetter();

      CreateMap<Profile, ProfileData>()
        .ForMember(_ => _.SharingTokens, _ => _.Ignore())
        .ReverseMap()
        .IgnoreAllPropertiesWithAnInaccessibleSetter();

      CreateMap<Profile, PublicProfileData>()
        .ReverseMap()
        .IgnoreAllPropertiesWithAnInaccessibleSetter();
      
      CreateMap<Address, Address>();
      CreateMap<CreditCard, CreditCard>();
    }
  }
}