/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "ExpressionMetadata.h"
#include "GDCore/CommonTools.h"
#include "GDCore/String.h"

namespace gd {

ExpressionMetadata::ExpressionMetadata(const gd::String& returnType_,
  const gd::String& extensionNamespace_,
                                       const gd::String& name_,
                                       const gd::String& fullname_,
                                       const gd::String& description_,
                                       const gd::String& group_,
                                       const gd::String& smallicon_)
    : returnType(returnType_),
      fullname(fullname_),
      description(description_),
      group(group_),
      shown(true),
      smallIconFilename(smallicon_),
      extensionNamespace(extensionNamespace_),
      isPrivate(false) {
}

ExpressionMetadata& ExpressionMetadata::SetHidden() {
  shown = false;
  return *this;
}

gd::ExpressionMetadata& ExpressionMetadata::AddParameter(
    const gd::String& type,
    const gd::String& description,
    const gd::String& supplementaryInformation,
    bool parameterIsOptional) {
  gd::ParameterMetadata info;
  info.type = type;
  info.description = description;
  info.codeOnly = false;
  info.optional = parameterIsOptional;
  info.supplementaryInformation =
      // For objects/behavior, the supplementary information
      // parameter is an object/behavior type...
      (gd::ParameterMetadata::IsObject(type) ||
       gd::ParameterMetadata::IsBehavior(type))
          ? (supplementaryInformation.empty()
                 ? ""
                 : extensionNamespace +
                       supplementaryInformation  //... so prefix it with the extension
                                           // namespace.
             )
          : supplementaryInformation;  // Otherwise don't change anything

  // TODO: Assert against supplementaryInformation === "emsc" (when running with
  // Emscripten), and warn about a missing argument when calling addParameter.

  parameters.push_back(info);
  return *this;
}

gd::ExpressionMetadata& ExpressionMetadata::AddCodeOnlyParameter(
    const gd::String& type, const gd::String& supplementaryInformation) {
  gd::ParameterMetadata info;
  info.type = type;
  info.codeOnly = true;
  info.supplementaryInformation = supplementaryInformation;

  parameters.push_back(info);
  return *this;
}


gd::ExpressionMetadata& ExpressionMetadata::SetRequiresBaseObjectCapability(
    const gd::String& capability) {
  requiredBaseObjectCapability = capability;
  return *this;
}

}  // namespace gd
